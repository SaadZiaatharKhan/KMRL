'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
  const supabase = await createClient()

  // Extract form data
  const email = (formData.get('email') as string)?.trim() ?? ''
  const password = (formData.get('password') as string) ?? ''
  const designation = (formData.get('designation') as string)?.trim() ?? ''
  const department = (formData.get('department') as string)?.trim() ?? ''

  // Basic validation
  if (!email || !password || !designation) {
    console.error('Missing required fields for login')
    redirect('/error')
  }

  // For non-directors, department is required
  if (designation !== 'Director' && !department) {
    console.error('Department required for non-director roles')
    redirect('/error')
  }

  try {
    console.log('Attempting login for:', { email, designation, department })

    // First authenticate the user
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (authError) {
      console.error('Authentication failed:', authError)
      redirect('/error')
    }

    if (!authData.user?.id) {
      console.error('No user ID returned after authentication')
      redirect('/error')
    }

    console.log('Authentication successful, checking profile...')

    // Get the user's profile from database
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', authData.user.id)
      .single()

    if (profileError || !profile) {
      console.error('Profile not found:', profileError)
      redirect('/error')
    }

    console.log('Profile found:', {
      designation: profile.designation,
      department: profile.department,
      is_director: profile.is_director,
      is_branch_manager: profile.is_branch_manager,
      is_others: profile.is_others
    })

    // Validate designation matches
    if (designation === 'Director') {
      if (!profile.is_director) {
        console.error('User is not a director but tried to login as director')
        redirect('/error')
      }
      console.log('Director login successful, redirecting...')
      revalidatePath('/', 'layout')
      redirect('/user/director')
    } 
    else if (designation === 'Department Manager') {
      if (!profile.is_branch_manager) {
        console.error('User is not a branch manager but tried to login as branch manager')
        redirect('/error')
      }
      
      // Check if department matches
      if (profile.department !== department) {
        console.error('Department mismatch:', { provided: department, actual: profile.department })
        redirect('/error')
      }
      
      console.log('Branch Manager login successful, redirecting...')
      revalidatePath('/', 'layout')
      redirect('/user/branch-manager')
    } 
    else if (designation === 'Others') {
      if (!profile.is_others) {
        console.error('User is not in Others category but tried to login as Others')
        redirect('/error')
      }
      
      // Check if department matches
      if (profile.department !== department) {
        console.error('Department mismatch:', { provided: department, actual: profile.department })
        redirect('/error')
      }
      
      console.log('Others login successful, redirecting...')
      revalidatePath('/', 'layout')
      redirect('/user/others')
    } 
    else {
      console.error('Invalid designation provided')
      redirect('/error')
    }

  } catch (err) {
    // Don't log NEXT_REDIRECT errors as they are expected
    if (err instanceof Error && err.message === 'NEXT_REDIRECT') {
      throw err // Re-throw redirect errors
    }
    console.error('Unexpected login error:', err)
    redirect('/error')
  }
}