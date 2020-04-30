import { faInfoCircle, faExclamationCircle, faExclamationTriangle, faCheckCircle } from '@fortawesome/free-solid-svg-icons'

export const defaultTheme = {
  colors: {
    primary: "#DD3333",
    primaryDark: "#AB2727",
    backgroundColor: "#FFFFFF",
    secondary: "#CBD5E0",
    secondaryDark: "#4A5568",
    fontColor: "#222222",
    subtle: "#EDF2F7",
    focus: "#90CDF4"
  },
  sizes: {
    maxContentWidth: "1200px",
  },
  buttons: {
    buttonTextColor: "#FFFFFF",
    buttonBorderRadius: "5px",
    buttonTextColorDark: "#1A202C",
    defaultRound: false
  },
  message: {
    base: {
      borderRadius: "5px",
      defaultRound: false
    },
    default: {
      color: "#2A4365",
      backgroundColor: "#BEE3F8",
      borderColor: "#90CDF4",
      icon: faInfoCircle
    },
    success: {
      color: "#22543D",
      backgroundColor: "#C6F6D5",
      borderColor: "#9AE6B4",
      icon: faCheckCircle
    },
    warning: {
      color: "#7B341E",
      backgroundColor: "#FEEBC8",
      borderColor: "#FBD38D",
      icon: faExclamationTriangle
    },
    error: {
      color: "#742A2A",
      backgroundColor: "#FED7D7",
      borderColor: "#FEB2B2",
      icon: faExclamationCircle
    },
  },
}