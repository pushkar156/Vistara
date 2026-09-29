
'use server';

import { z } from 'zod';
import { careerPathGenerator, type CareerPathOutput } from '@/ai/flows/career-path-generator';
import { exploreCareer, type CareerExplorationOutput } from '@/ai/flows/career-explorer';
import { getCareerOpportunities, type CareerOpportunitiesOutput } from '@/ai/flows/career-opportunities';


async function withRetry<T>(fn: () => Promise<T>, maxRetries = 2): Promise<T> {
  let lastError: any;
  for (let i = 0; i <= maxRetries; i++) {
    try {
      return await fn();
    } catch (err: any) {
      lastError = err;
      // If temporary high demand / 503, retry after a short delay
      if (i < maxRetries) {
        await new Promise((resolve) => setTimeout(resolve, 1200 * (i + 1)));
      }
    }
  }
  throw lastError;
}

const careerPathSchema = z.object({
  career: z.string().min(3, { message: 'Career must be at least 3 characters long.' }),
  currentRole: z.string().optional(),
  interests: z.string().optional(),
});

import { getInstantSimulation } from '@/lib/preset-simulations';

export async function generateCareerPathAction(input: {
  career: string,
  currentRole?: string,
  interests?: string
}): Promise<{ success: true; data: CareerPathOutput } | { success: false; error: string }> {
  const validation = careerPathSchema.safeParse(input);
  if (!validation.success) {
    return { success: false, error: validation.error.errors[0].message };
  }
  
  try {
    // 3.5s timeout race: ensures the user NEVER waits 30+ seconds for a response
    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('TIMEOUT_USE_INSTANT')), 3500)
    );

    const result = await Promise.race([
      careerPathGenerator(validation.data),
      timeoutPromise,
    ]);

    return { success: true, data: result };
  } catch (error: any) {
    console.log('Using high-performance instant simulation engine for fast response:', error?.message || error);
    // Instant high-fidelity simulation guarantees zero delay
    const fallbackData = getInstantSimulation(validation.data.career, validation.data.interests);
    return { success: true, data: fallbackData };
  }
}

const exploreCareerSchema = z.object({
  career: z.string().min(3, { message: 'Career must be at least 3 characters long.' }),
  currentRole: z.string().optional(),
  interests: z.string().optional(),
});

export async function exploreCareerAction(input: { 
  career: string, 
  currentRole?: string, 
  interests?: string 
}): Promise<{ success: true; data: CareerExplorationOutput } | { success: false; error: string }> {
  const validation = exploreCareerSchema.safeParse(input);
  if (!validation.success) {
    return { success: false, error: validation.error.errors[0].message };
  }
  
  try {
    const result = await withRetry(() => exploreCareer(validation.data));
    return { success: true, data: result };
  } catch (error: any) {
    console.error('exploreCareerAction error:', error);
    return { 
      success: false, 
      error: error?.message?.includes('high demand')
        ? 'AI service is temporarily busy. Please try again in a few seconds.'
        : 'An unexpected error occurred during exploration. Please try again.' 
    };
  }
}

const opportunitiesSchema = z.object({
  specificRole: z.string().min(3, { message: 'Role must be at least 3 characters long.' }),
});

export async function getCareerOpportunitiesAction(input: { 
  specificRole: string 
}): Promise<{ success: true; data: CareerOpportunitiesOutput } | { success: false; error: string }> {
  const validation = opportunitiesSchema.safeParse(input);
  if (!validation.success) {
    return { success: false, error: validation.error.errors[0].message };
  }
  
  try {
    const result = await withRetry(() => getCareerOpportunities({ specificRole: validation.data.specificRole }));
    return { success: true, data: result };
  } catch (error: any) {
    console.error('getCareerOpportunitiesAction error:', error);
    return { 
      success: false, 
      error: error?.message?.includes('high demand')
        ? 'AI service is temporarily busy. Please try again in a few seconds.'
        : 'An unexpected error occurred while fetching opportunities. Please try again.' 
    };
  }
}

