import '@testing-library/jest-dom';

// JSDOM doesn't implement IntersectionObserver; mock it so components using it
class IntersectionObserverMock {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
}

globalThis.IntersectionObserver = IntersectionObserverMock;
