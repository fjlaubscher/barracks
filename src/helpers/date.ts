import { format, parseISO } from 'date-fns';

const DATE_FORMAT = 'dd MMMM yyyy';

export const formatDate = (input?: string) => (input ? format(parseISO(input), DATE_FORMAT) : '');
