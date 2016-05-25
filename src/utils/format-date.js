import Constants from '../constants'

function formatDate(date) {
  if (date === 'Present') return date

  let {dayNames, monthNames} = Constants

  date = new Date(date)
  return `${dayNames[date.getDay()]}, ${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
}

export default formatDate
