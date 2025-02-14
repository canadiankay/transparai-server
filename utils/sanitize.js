export const sanitizeInput = (input) => {
    if (typeof input !== 'string') {
      return '';
    }
    
    input = input.replace(/<[^>]*>/g, '');
    
    input = input.replace(/[^\w\s.,!?-]/g, '');
    
    input = input.trim();
    
    return input;
  };