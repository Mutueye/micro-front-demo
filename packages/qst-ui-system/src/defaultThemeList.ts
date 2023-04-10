import type { UITheme } from './theme';

export const defaultThemeList: UITheme[] = [
  {
    name: 'athena',
    config: {
      light: {
        color: {
          primary: '#217aff',
          success: '#67c23a',
          warning: '#f2711c',
          danger: '#db2828',
          info: '#96979c',
        },
        'text-color': {
          primary: '#131b26',
          regular: '#5f6165',
          secondary: '#96979c',
          placeholder: '#cacbd0',
          disabled: '#c0c4cc',
        },
        'bg-color': {
          DEFAULT: '#ffffff',
          page: '#f7f8fd',
          secondary: '#eef0f8',
        },
        'border-color': {
          'extra-light': '#f2f6fc',
          lighter: '#ebeef5',
          light: '#e4e7ed',
          DEFAULT: '#dcdfe6',
          dark: '#d4d7de',
          darker: '#cdd0d6',
        },
        'fill-color': {
          blank: '#ffffff',
          'extra-light': '#fafcff',
          lighter: '#f8fafc',
          light: '#f5f7fa',
          DEFAULT: '#f0f2f5',
          dark: '#ebedf0',
          darker: '#e6e8eb',
        },
        'border-radius': {
          small: '2px',
          base: '4px',
          large: '6px',
          huge: '8px',
          round: '20px',
          circle: '100%',
        },
        space: {
          xxxs: '4px',
          xxs: '8px',
          xs: '12px',
          sm: '16px',
          md: '20px',
          DEFAULT: '24px',
          lg: '28px',
          xl: '32px',
          xxl: '36px',
          xxxl: '40px',
        },
        'font-size': {
          'extra-small': '12px',
          small: '13px',
          base: '14px',
          medium: '16px',
          large: '18px',
          'extra-large': '20px',
        },
        'component-size': {
          small: '24px',
          DEFAULT: '36px',
          large: '40px',
        },
      },
      dark: {
        color: {
          primary: '#217aff',
          success: '#67c23a',
          warning: '#f2711c',
          danger: '#db2828',
          info: '#96979c',
        },
        'text-color': {
          primary: '#ffffff',
          regular: '#cfd3dc',
          secondary: '#a3a6ad',
          placeholder: '#8d9095',
          disabled: '#6c6e72',
        },
        'bg-color': {
          DEFAULT: '#28303d',
          page: '#1b2431',
          secondary: '#171f2b',
        },
        'border-color': {
          'extra-light': '#313a47',
          lighter: '#3a4554',
          light: '#444f5e',
          DEFAULT: '#576273',
          dark: '#677282',
          darker: '#707b8c',
        },
        'fill-color': {
          blank: 'transparent',
          'extra-light': '#252c38',
          lighter: '#222b38',
          light: '#1f2733',
          DEFAULT: '#1e2633',
          dark: '#1a222e',
          darker: '#171e29',
        },
        'border-radius': {
          small: '2px',
          base: '4px',
          large: '6px',
          huge: '8px',
          round: '20px',
          circle: '100%',
        },
        space: {
          xxxs: '4px',
          xxs: '8px',
          xs: '12px',
          sm: '16px',
          md: '20px',
          DEFAULT: '24px',
          lg: '28px',
          xl: '32px',
          xxl: '36px',
          xxxl: '40px',
        },
        'font-size': {
          'extra-small': '12px',
          small: '13px',
          base: '14px',
          medium: '16px',
          large: '18px',
          'extra-large': '20px',
        },
        'component-size': {
          small: '24px',
          DEFAULT: '36px',
          large: '40px',
        },
      },
    },
  },
  {
    name: 'uplus',
    config: {
      light: {
        color: {
          primary: '#67aef7',
          success: '#a8d3a6',
          warning: '#f39800',
          danger: '#fc7373',
          info: '#969eb3',
        },
        'text-color': {
          primary: '#222222',
          regular: '#666666',
          secondary: '#999999',
          placeholder: '#bbbbbb',
          disabled: '#cccccc',
        },
        'bg-color': {
          DEFAULT: '#ffffff',
          page: '#f8f9fa',
          secondary: '#f2f3f4',
        },
        'border-color': {
          'extra-light': '#f2f6fc',
          lighter: '#ebeef5',
          light: '#e4e7ed',
          DEFAULT: '#dcdfe6',
          dark: '#d4d7de',
          darker: '#cdd0d6',
        },
        'fill-color': {
          blank: '#ffffff',
          'extra-light': '#fafcff',
          lighter: '#fafafa',
          light: '#f5f7fa',
          DEFAULT: '#f0f2f5',
          dark: '#ebedf0',
          darker: '#e6e8eb',
        },
        'border-radius': {
          small: '2px',
          base: '4px',
          large: '6px',
          huge: '8px',
          round: '20px',
          circle: '100%',
        },
        space: {
          xxxs: '4px',
          xxs: '8px',
          xs: '12px',
          sm: '16px',
          md: '20px',
          DEFAULT: '24px',
          lg: '28px',
          xl: '32px',
          xxl: '36px',
          xxxl: '40px',
        },
        'font-size': {
          'extra-small': '12px',
          small: '13px',
          base: '14px',
          medium: '16px',
          large: '18px',
          'extra-large': '20px',
        },
        'component-size': {
          small: '24px',
          DEFAULT: '32px',
          large: '40px',
        },
      },
      dark: {
        color: {
          primary: '#67aef7',
          success: '#a8d3a6',
          warning: '#f39800',
          danger: '#fc7373',
          info: '#969eb3',
        },
        'text-color': {
          primary: '#e5eaf3',
          regular: '#cfd3dc',
          secondary: '#a3a6ad',
          placeholder: '#8d9095',
          disabled: '#6c6e72',
        },
        'bg-color': {
          DEFAULT: '#252525',
          page: '#181818',
          secondary: '#111111',
        },
        'border-color': {
          'extra-light': '#2B2B2C',
          lighter: '#363637',
          light: '#414243',
          DEFAULT: '#4C4D4F',
          dark: '#58585B',
          darker: '#636466',
        },
        'fill-color': {
          blank: 'transparent',
          'extra-light': '#191919',
          lighter: '#1D1D1D',
          light: '#262727',
          DEFAULT: '#303030',
          dark: '#39393A',
          darker: '#424243',
        },
        'border-radius': {
          small: '2px',
          base: '4px',
          large: '6px',
          huge: '8px',
          round: '20px',
          circle: '100%',
        },
        space: {
          xxxs: '4px',
          xxs: '8px',
          xs: '12px',
          sm: '16px',
          md: '20px',
          DEFAULT: '24px',
          lg: '28px',
          xl: '32px',
          xxl: '36px',
          xxxl: '40px',
        },
        'font-size': {
          'extra-small': '12px',
          small: '13px',
          base: '14px',
          medium: '16px',
          large: '18px',
          'extra-large': '20px',
        },
        'component-size': {
          small: '24px',
          DEFAULT: '32px',
          large: '40px',
        },
      },
    },
  },
];
