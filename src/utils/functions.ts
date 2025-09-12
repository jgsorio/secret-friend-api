export const today = (): string => {
  return new Date().toLocaleDateString('pt-br').replaceAll('/', '');
} 
