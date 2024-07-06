export const getToday = (): string => {
    return new Date().toLocaleDateString('pt-br').replaceAll('/', '');
}