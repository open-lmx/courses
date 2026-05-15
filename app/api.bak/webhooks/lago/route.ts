import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();
    const webhookType = payload.webhook_type;

    console.log('Lago webhook received:', webhookType);

    switch (webhookType) {
      case 'Customer':
        await handleCustomerEvent(payload);
        break;
      case 'Subscription':
        await handleSubscriptionEvent(payload);
        break;
      case 'Invoice':
        await handleInvoiceEvent(payload);
        break;
      case 'Payment':
        await handlePaymentEvent(payload);
        break;
      default:
        console.log('Unhandled webhook type:', webhookType);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }
}

async function handleCustomerEvent(payload: any) {
  console.log('Customer event:', payload);
}

async function handleSubscriptionEvent(payload: any) {
  console.log('Subscription event:', payload);
}

async function handleInvoiceEvent(payload: any) {
  console.log('Invoice event:', payload);
}

async function handlePaymentEvent(payload: any) {
  console.log('Payment event:', payload);
}
