 export const columnArray = [
    { 
      title: 'Professores', 
      field: 'id', 
      render: rowData => 
        <FixedTags 
          {...props} 
          classes={classList}
          newClassList={newClassList}
          setNewClassList={setNewClassList} 
          profsList={period && professorsList} 
          rowData={rowData}
        /> 
    },
    { 
      title: 'Disciplina', 
      field: 'name' 
    },
    { 
      title: 'Sigla', 
      field: 'slug' 
    }
]

export const localizationObj = {
    header: {actions: 'Ações'},
    body: {emptyDataSourceMessage: "Nenhuma turma."},
    pagination: {
      searchTooltip: "Buscar",
      searchPlaceholder: "Buscar",
      labelRowsSelect: "Linhas",
      labelRowsPerPage: "Linhas por página",
      firstAriaLabel: "Primeira Página",
      firstTooltip: "Primeira Página",
      previousAriaLabel: "Página Anterior",
      previousTooltip: "Página Anterior",
      nextAriaLabel: "Próxima Página",
      nextTooltip: "Próxima Página",
      lastAriaLabel: "Última Página",
      lastTooltip: "Última Página",
    },
    toolbar: {
      searchTooltip: "Buscar",
      searchPlaceholder: "Buscar",
    }
}