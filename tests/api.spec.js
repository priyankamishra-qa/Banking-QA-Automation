const { test, expect } = require('@playwright/test');
// Check whether the ParaBank demo login service is available.
async function isLoginServiceAvailable(request) {
    const response = await request.get(
        'https://parabank.parasoft.com/parabank/services/bank/login/john/demo',
        { headers: { Accept: 'application/json' } }
    );

    return response.status() === 200;
}
const { BankApi } = require('../api/BankApi');
test.describe('ParaBank API Testing', () => {

test('API - Login with valid credentials', async ({ request }) => {
    const serviceAvailable = await isLoginServiceAvailable(request);

    // Skip only when the demo login service is unavailable
    test.skip(
        !serviceAvailable,
        'ParaBank demo login service is currently unavailable'
    );

    const bankApi = new BankApi(request);
    const response = await bankApi.login('john', 'demo');

    // Verify successful HTTP response
    expect(response.status()).toBe(200);

    // Verify customer details in the JSON response
    const customer = await response.json();

    // Verify the API returns valid customer details
    expect(customer.id).toBeTruthy();
    expect(typeof customer.id).toBe('number');

    expect(customer.firstName).toBeTruthy();
    expect(typeof customer.firstName).toBe('string');

    expect(customer.lastName).toBeTruthy();
    expect(typeof customer.lastName).toBe('string');
    });

    test('API - Login with invalid credentials', async ({ request }) => {
        const bankApi = new BankApi(request);

        const response = await bankApi.login(
            'invaliduser',
            'wrongpass'
        );

        // Verify that invalid credentials are rejected
        expect(response.ok()).toBe(false);

        // Verify the error response
        const responseBody = await response.text();

        expect(responseBody).toContain(
            'Invalid username and/or password'
        );
    });
    
    test('API - Retrieve customer accounts', async ({ request }) => {
        const bankApi = new BankApi(request);

        // Customer ID returned by the valid john/demo login
        const response = await bankApi.getCustomerAccounts(12212);

        // Verify the API request succeeded
        expect(response.status()).toBe(200);

        // Verify the response is a JSON array of accounts
        const accounts = await response.json();

        expect(Array.isArray(accounts)).toBe(true);
        expect(accounts.length).toBeGreaterThan(0);

        // Verify each account has an ID
        for (const account of accounts) {
            expect(account.id).toBeTruthy();
        }
    });

    test('API - Retrieve accounts for nonexistent customer', async ({ request }) => {
    const bankApi = new BankApi(request);
    const response = await bankApi.getCustomerAccounts(999999999);

    // Verify the API rejects the nonexistent customer
    expect(response.status()).toBe(400);

    // Verify the error message
    const responseBody = await response.text();

    expect(responseBody).toContain(
        'Could not find customer #999999999'
    );
    });

    test('API - Retrieve transactions for a valid account', async ({ request }) => {
    const bankApi = new BankApi(request);
    const response = await bankApi.getAccountTransactions(12345);

    // Verify successful response
    expect(response.status()).toBe(200);

    // Verify the response contains a list of transactions
    const transactions = await response.json();

    expect(Array.isArray(transactions)).toBe(true);
    expect(transactions.length).toBeGreaterThan(0);

    // Verify the structure and data of each transaction
    for (const transaction of transactions) {
        expect(transaction.id).toBeTruthy();
        expect(transaction.accountId).toBe(12345);
        expect(['Credit', 'Debit']).toContain(transaction.type);
        expect(typeof transaction.amount).toBe('number');
        expect(transaction.description).toBeTruthy();
    }
    });

    test('API - Retrieve transactions for nonexistent account', async ({ request }) => {
    const bankApi = new BankApi(request);
    const response = await bankApi.getAccountTransactions(999999999);

    // Verify the API rejects the nonexistent account
    expect(response.status()).toBe(400);

    // Verify the returned error message
    const responseBody = await response.text();

    expect(responseBody).toContain(
        'Could not find transactions for account #999999999'
    );
    });

});
