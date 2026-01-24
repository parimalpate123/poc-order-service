/**
 * Order Service - POC for Auto-Remediation Testing
 * 
 * This service handles order management operations.
 * It's designed to demonstrate auto-remediation capabilities.
 */

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.json());

// Create order endpoint
app.post('/api/v1/orders', async (req, res) => {
  try {
    const { userId, items, shippingAddress } = req.body;
    
    // Validate input
    if (!userId || !items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ 
        error: 'Missing required fields: userId, items (non-empty array)' 
      });
    }

    // Validate items
    for (const item of items) {
      if (!item.productId || !item.quantity || !item.price) {
        return res.status(400).json({ 
          error: 'Each item must have: productId, quantity, price' 
        });
      }
    }

    // Create order
    const order = await createOrder(userId, items, shippingAddress);
    
    res.status(201).json({
      success: true,
      orderId: order.id,
      userId: order.userId,
      total: order.total,
      status: order.status
    });
  } catch (error) {
    console.error('Order creation error:', error);
    res.status(500).json({ 
      error: 'Order creation failed',
      message: error.message 
    });
  }
});

// Get order status
app.get('/api/v1/orders/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await getOrderStatus(orderId);
    
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    res.status(200).json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ 
      error: 'Failed to fetch order status',
      message: error.message 
    });
  }
});

// Delete order endpoint
app.delete('/api/v1/orders/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;
    const deleted = await deleteOrder(orderId);
    
    if (!deleted) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    res.status(200).json({
      success: true,
      message: 'Order deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({ 
      error: 'Failed to delete order',
      message: error.message 
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'healthy',
    service: 'order-service',
    timestamp: new Date().toISOString()
  });
});

// Simulate order creation
async function createOrder(userId, items, shippingAddress) {
  // Simulate potential issues:
  // - Database connection timeout
  // - Inventory check failures
  // - Payment processing errors
  
  await new Promise(resolve => setTimeout(resolve, 150));
  
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  return {
    id: `ORDER-${Date.now()}`,
    userId,
    items,
    shippingAddress: shippingAddress || null,
    total: total.toFixed(2),
    status: 'pending',
    timestamp: new Date().toISOString()
  };
}

// Simulate fetching order status
async function getOrderStatus(orderId) {
  // Simulate potential issues:
  // - Database query timeout
  // - Order not found handling
  
  await new Promise(resolve => setTimeout(resolve, 50));
  
  return {
    id: orderId,
    status: 'pending',
    total: '99.99',
    timestamp: new Date().toISOString()
  };
}

// Simulate deleting order
async function deleteOrder(orderId) {
  // Simulate potential issues:
  // - Database delete timeout
  // - Order not found handling
  
  await new Promise(resolve => setTimeout(resolve, 50));
  return true;
}

// Start server
app.listen(PORT, () => {
  console.log(`Order service running on port ${PORT}`);
});

module.exports = app;
