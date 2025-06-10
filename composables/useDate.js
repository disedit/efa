export const useDate = () => {
  return {
    formatDate (dateInput) {
      const date = new Date(dateInput)
      const day = String(date.getDate()).padStart(2, '0')
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const year = date.getFullYear()

      return `${day}-${month}-${year}`
    },

    humanDate (dateInput, monthLength = 'long') {
      const date = new Date(dateInput);
      const day = date.getDate(); // No leading zero
      const month = date.toLocaleString('en-GB', { month: monthLength });
      const year = date.getFullYear();
    
      return `${day} ${month} ${year}`;
    },

    time (dateInput) {
      const date = new Date(dateInput)
      const hours = String(date.getHours()).padStart(2, '0')
      const minutes = String(date.getMinutes()).padStart(2, '0')

      return `${hours}:${minutes}`
    }
  }
}
