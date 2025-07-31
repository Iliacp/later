export type LaterUIColor = typeof LaterUIColor[keyof typeof LaterUIColor];
export const LaterUIColor = {
    PRIMARY: 'primary',
    ON_PRIMARY: 'on-primary', 
    SECONDARY: 'secondary',
    ON_SECONDARY: 'on-secondary',
    TERTIARY: 'tertiary',
    ON_TERTIARY: 'on-tertiary',
    ERROR: 'error',
    ON_ERROR: 'on-error',
    SURFACE: 'surface',
    ON_SURFACE: 'on-surface',
    OUTLINE: 'outline',
    OUTLINE_VARIANT: 'outline-variant',
} as const;

export function getColor(color?: LaterUIColor): `--mat-sys-${LaterUIColor}` | '' {
    if(!color) return '';
    return `--mat-sys-${color}`;
}

export type LaterUITypography = typeof LaterUITypography[keyof typeof LaterUITypography];
export const LaterUITypography = {
    BODY_SMALL:         'body-small',
    BODY_MEDIUM:        'body-medium',
    BODY_LARGE:         'body-large',
    DISPLAY_SMALL:      'display-small',
    DISPLAY_MEDIUM:     'display-medium',
    DISPLAY_LARGE:      'display-large',
    HEADLINE_SMALL:     'headline-small',
    HEADLINE_MEDIUM:    'headline-medium',
    HEADLINE_LARGE:     'headline-large',
    LABEL_SMALL:        'label-small',
    LABEL_MEDIUM:       'label-medium',
    LABEL_LARGE:        'label-large',
    TITLE_SMALL:        'title-small',
    TITLE_MEDIUM:       'title-medium',
    TITLE_LARGE:        'title-large',
    BOLD:               'bold',
    NOT_BOLD:           'not-bold',
} as const;

export function getTypographyClass(typo?: LaterUITypography): `${'later-ui-'}${LaterUITypography}` | '' {
    if(!typo) return '';
    else return `${'later-ui-'}${typo}`;
}