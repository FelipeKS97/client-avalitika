import { ptBR } from 'date-fns/locale';
import { parseISO, format } from 'date-fns'

export const formatArrayDates = (arrayWithDates) => {
  return arrayWithDates.map((arr) => {
    let parsedDate = parseISO(arr.created_at);
    let formattedDate = format(parsedDate, "dd 'de' MMMM' de' yyyy', às ' HH:mm'h'", {
      locale: ptBR,
    });

    return {...arr, created_at: formattedDate}
  });
};
