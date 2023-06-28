import { setupServer } from 'msw/node'
// This configures a request mocking server with the given request handlers.
export const server = setupServer(...[]);

// eslint-disable-next-line import/no-anonymous-default-export
export default {};