import { grey } from '../themes/colors'
import { hexToRgba } from '../../utilities/colors'

export const cardShadow = `0 0 2px 0 rgba(${hexToRgba(grey[4], 0.25)}), 2px 2px 5px 0 rgba(${hexToRgba(grey[4], 0.25)})`;

export const cardShadowHover = `0 0 15px 0 rgba(${hexToRgba(grey[4], 0.45)}), 2px 2px 5px -1px rgba(${hexToRgba(grey[4], 0.25)})`;