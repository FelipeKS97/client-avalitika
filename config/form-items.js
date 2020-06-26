export const items = [
  {
    key: 'Header',
    name: 'Texto de Cabeçalho',
    icon: 'fa fa-header',
    "static": true,
    content: 'Texto...'
  },
  {
    key: 'Label',
    name: 'Letreiro',
    "static": true,
    icon: 'fa fa-font',
    content: 'Texto...'
  },
  {
    key: 'Paragraph',
    name: 'Parágrafo',
    "static": true,
    icon: 'fa fa-paragraph',
    content: 'Texto...'
  }, {
    key: 'LineBreak',
    name: 'Quebra de Linha',
    "static": true,
    icon: 'fa fa-arrows-h'
  },
  {
    key: 'TextInput',
    canHaveAnswer: true,
    canHaveAlternateForm: false,
    name: 'Entrada de Texto',
    label: 'Conteúdo...',
    icon: 'fa fa-font',
    field_name: 'text_input_',
  },
  {
    key: 'Dropdown',
    canHaveAnswer: true,
    name: 'Caixa de Seleção',
    icon: 'fa fa-caret-square-o-down',
    label: 'Conteúdo...',
    field_name: 'dropdown_',
    options: [],
  },
  {
    key: 'RadioButtons',
    canHaveOptionValue: false,
    name: 'Múltipla Escolha',
    icon: 'fa fa-dot-circle-o',
    label: 'Conteúdo...',
    field_name: 'radiobuttons_',
    options: [],
  },
  {
    key: 'TextInput',
    canHaveAnswer: true,
    name: 'Campo de Texto',
    label: 'Conteúdo...',
    icon: 'fa fa-font',
    field_name: 'text_input_'
  }, {
    key: 'NumberInput',
    canHaveAnswer: true,
    name: 'Campo de Número',
    label: 'Conteúdo...',
    icon: 'fa fa-plus',
    field_name: 'number_input_'
  }, {
    key: 'TextArea',
    canHaveAnswer: true,
    name: 'Campo de Texto Multi-linha',
    label: 'Conteúdo...',
    icon: 'fa fa-text-height',
    field_name: 'text_area_'
  } 
];