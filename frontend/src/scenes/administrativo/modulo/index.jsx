// Propriedades compartilhadas
export const shared_props = {
  entity_name: "modulo",
  title: "Modulo",
  module: "adm",
};

// Propriedades Index
export const indexProps = {
  ...shared_props,
  columns: () => {
    return [
      { field: "id", headerName: "ID", headerClassName: "colum--header" },
      {
        field: "nome",
        headerClassName: "colum--header",
        headerName: "Nome",
        flex: 1,
      },
      {
        field: "sigla",
        headerClassName: "colum--header",
        headerName: "Sigla",
        flex: 1,
      },
    ];
  },
  supress_actions: true,
  supress_add: true,
};

export default {
  indexProps,
};
