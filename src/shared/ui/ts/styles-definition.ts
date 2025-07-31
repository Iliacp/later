// DOES NOT WORK YET

export type LaterUITextColor = typeof LaterUITextColor[keyof typeof LaterUITextColor];
export const LaterUITextColor = {
    DARK: 'dark',
    LIGHT: 'light',
    RED: 'red',
    BLUE: 'blue'
} as const;

export type LaterUITypography = typeof LaterUITypography[keyof typeof LaterUITypography];
export const LaterUITypography = {
    HEADLINE_1: 'headline-1',
    HEADLINE_2: 'headline-2',
    HEADLINE_3: 'headline-3',
    HEADLINE_4: 'headline-4',
    HEADLINE_5: 'headline-5',
    HEADLINE_6: 'headline-6',
    SUBTITLE_1: 'subtitle-1',
    SUBTITLE_2: 'subtitle-2',
    BODY_1: 'body-1',
    BODY_2: 'body-2',
    CAPTION: 'caption',
    BUTTON: 'button',
    BOLD_BUTTON: 'bold-button',
    BOLD: 'bold',
    REGULAR: 'regular'
} as const;

export function getTextColorClass(color?: LaterUITextColor): `${'later-typography-'}${LaterUITextColor}` | '' {
    if(!color) return '';
    else return `${'later-typography-'}${color}`;
}

export function getTypographyClass(typo?: LaterUITypography): `${'later-typography-'}${LaterUITypography}` | '' {
    if(!typo) return '';
    else return `${'later-typography-'}${typo}`;
}