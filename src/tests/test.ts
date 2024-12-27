import request from 'supertest';
import app from '../app';

test('Admin API - Add a grocery item', async () => {
  const res = await request(app)
    .post('/admin/grocery')
    .send({ name: 'Apple', price: 1.5, quantity: 10 });

  expect(res.statusCode).toBe(200);
  expect(res.body.success).toBe(true);
  expect(res.body.groceryItem).toHaveProperty('id'); // Optional: Verify the created item has an ID
  expect(res.body.groceryItem.name).toBe('Apple');   // Optional: Verify the name is correct
});

test('Authentication Tests - Should register a user', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({ email: 'test@example.com', password: '123456', role: 'user' });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
});
