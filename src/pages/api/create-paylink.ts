export const prerender = false;

import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  const secretKey = import.meta.env.YOCO_SECRETE_KEY;
  if (!secretKey) {
    return new Response(JSON.stringify({ error: 'YOCO secret key not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  let body: {
    amount: number;
    currency?: string;
    description?: string;
    metadata?: Record<string, string>;
  };

  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { amount, currency = 'ZAR', description, metadata } = body;

  if (!amount || typeof amount !== 'number' || amount < 100) {
    return new Response(
      JSON.stringify({ error: 'Amount is required and must be at least 100 cents (R1.00)' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } },
    );
  }

  const siteUrl = import.meta.env.SITE || 'https://experienceafrica.co.za';

  const yocoResponse = await fetch('https://payments.yoco.com/api/checkouts', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${secretKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      amount,
      currency,
      successUrl: `${siteUrl}/paylink/success`,
      cancelUrl: `${siteUrl}/paylink/cancel`,
      failureUrl: `${siteUrl}/paylink/failure`,
      metadata: {
        ...metadata,
        description: description || '',
      },
    }),
  });

  const data = await yocoResponse.json();

  if (!yocoResponse.ok) {
    return new Response(JSON.stringify({ error: 'Failed to create checkout', details: data }), {
      status: yocoResponse.status,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(
    JSON.stringify({
      id: data.id,
      redirectUrl: data.redirectUrl,
      paymentUrl: `${siteUrl}/paylink/${data.id}`,
    }),
    {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    },
  );
};
