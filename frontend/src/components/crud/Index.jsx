import { toast } from "react-toastify";
import { Box, Button, IconButton, useTheme } from "@mui/material";
import {
  DataGrid,
  ptBR,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import Header from ".././Header";
import axios from "axios";
import Alert from "@mui/material/Alert";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Collapse from "@mui/material/Collapse";
import * as React from "react";
import EditIcon from "@mui/icons-material/Edit";
import Tooltip from "@mui/material/Tooltip";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import CheckIcon from "@mui/icons-material/Check";

const Index = ({
  sortEntity,
  columns,
  entity_name,
  title,
  collapsed_prop,
  supress_actions,
  supress_add,
  module,
  supress_delete,
  supress_alter,
  supress_view,
  supress_concluir,
}) => {
  const [entity, setEntity] = React.useState([]);
  const [open, setAlert] = React.useState(false);
  const [to_delete, setToDelete] = React.useState(null);
  const [to_concluir, setToConcluir] = React.useState(null);
  const [windowSize, setWindowSize] = React.useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const { user } = useAuth();
  const access = user.acessos.find((acesso) => acesso.modulo.sigla === module);
  const token = JSON.parse(localStorage.getItem("user_token")).token;
  const headers = {
    Authorization: token,
  };
  const navigate = useNavigate();

  const updateWindowSize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  function formatCPF(cpf) {
    if (!cpf) return "";
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  }

  function formatCEP(cep) {
    if (!cep) return "";
    return cep.replace(/(\d{5})(\d{3})$/, "$1-$2");
  }

  function formatTEL(tel) {
    if (!tel) return "";
    return tel.replace(/(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
  }

  React.useEffect(() => {
    configureEntity();
    window.addEventListener("resize", updateWindowSize);
    return () => {
      window.removeEventListener("resize", updateWindowSize);
    };
  }, [entity_name]);

  const configureEntity = async () => {
    try {
      const result = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/${entity_name}`,
        {
          headers,
        }
      );
      if (sortEntity) setEntity(sortEntity(result));
      else setEntity(result.data.sort((a, b) => a.id - b.id));
    } catch (error) {
      navigate("/404");
    }
  };

  const validarSequencia = (data) => {
    if (data.toString().length == 1) {
      data = "0" + data;
    }
    return data;
  };

  const dateFormatter = (data, withoutTime) => {
    if (!data) return "";

    let nova_data = new Date(data);
    let dia = nova_data.getDate();
    dia = validarSequencia(dia);
    let mes = nova_data.getMonth() + 1;
    mes = validarSequencia(mes);
    let ano = nova_data.getFullYear();

    if (withoutTime) return dia + "/" + mes + "/" + ano;

    let hora = nova_data.getHours();
    hora = validarSequencia(hora);
    let minutos = nova_data.getMinutes();
    minutos = validarSequencia(minutos);
    let segundos = nova_data.getSeconds();
    segundos = validarSequencia(segundos);

    return (
      dia + "/" + mes + "/" + ano + " " + hora + ":" + minutos + ":" + segundos
    );
  };

  const deleteEntity = async () => {
    const result = await axios.delete(
      `${import.meta.env.VITE_BACKEND_URL}/${entity_name}/${to_delete}`,
      {
        headers,
      }
    );
    if (!result.data.error) {
      configureEntity();
      toast.success(result.data.ok);
    } else {
      toast.error(result.data.error);
    }
    setAlert(false);
    setToDelete(null);
  };

  const handleDeleteEntity = (id) => {
    setToDelete(id);
    setAlert(true);
  };

  const concluirEntity = async () => {
    const result = await axios.get(
      `${
        import.meta.env.VITE_BACKEND_URL
      }/ordem_servico/concluir/${to_concluir}`,
      {
        headers,
      }
    );
    if (!result.data.error) {
      configureEntity();
      toast.success(result.data.ok);
    } else {
      toast.error(result.data.error);
    }
    setAlert(false);
    setToConcluir(null);
  };

  const handleConcluirEntity = (id) => {
    setToConcluir(id);
    setAlert(true);
  };

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const column = [
    ...columns(dateFormatter, colors, formatCPF, formatCEP, formatTEL),
  ];

  if (!supress_actions && (access.alterar || access.deletar)) {
    column.push({
      field: "acao",
      headerClassName: "colum--header",
      headerName: "Ações",
      align: "center",
      renderCell: ({ row: { id } }) => {
        return (
          <>
            {!supress_view && (
              <Box
                width="0%"
                m="0 auto"
                p="1px"
                paddingRight="30px"
                display="flex"
                justifyContent="left"
                borderRadius="2px"
              >
                <Link to={`/${entity_name}/visualizar/` + id}>
                  <Tooltip title="Visualizar">
                    <IconButton type="button" sx={{ p: 1 }}>
                      <RemoveRedEyeIcon />
                    </IconButton>
                  </Tooltip>
                </Link>
              </Box>
            )}
            {access.alterar && !supress_alter && (
              <Box
                width="60%"
                m="0 auto"
                p="1px"
                paddingRight="50px"
                display="flex"
                justifyContent="left"
                borderRadius="2px"
              >
                <Link to={`/${entity_name}/alterar/` + id}>
                  <Tooltip title="Editar">
                    <IconButton type="button" sx={{ p: 1 }}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                </Link>
              </Box>
            )}
            {access.deletar && !supress_delete && (
              <Box
                width="30%"
                m="0 auto"
                p="12px"
                display="flex"
                justifyContent="right"
                borderRadius="2px"
              >
                <Tooltip title="Excluir">
                  <IconButton
                    type="button"
                    sx={{ p: 1 }}
                    onClick={() => handleDeleteEntity(id)}
                  >
                    <DeleteIcon style={{ color: colors.redAccent[500] }} />
                  </IconButton>
                </Tooltip>
              </Box>
            )}
            {access.alterar && !supress_concluir && (
              <Box
                width="30%"
                m="0 auto"
                p="12px"
                display="flex"
                justifyContent="right"
                borderRadius="2px"
              >
                <Tooltip title="Concluir">
                  <IconButton
                    type="button"
                    sx={{ p: 1 }}
                    onClick={() => handleConcluirEntity(id)}
                  >
                    <CheckIcon style={{ color: colors.greenAccent[500] }} />
                  </IconButton>
                </Tooltip>
              </Box>
            )}
          </>
        );
      },
    });
  }

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport printOptions={{ disableToolbarButton: true }} />
      </GridToolbarContainer>
    );
  }

  return (
    <Box borderRadius="20px" p="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title={title} subtitle={`Administração de ${title}`} />
        <Collapse in={open}>
          <Alert
            severity="warning"
            action={
              <>
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  onClick={() => {
                    {
                      to_concluir ? concluirEntity() : deleteEntity();
                    }
                  }}
                >
                  Sim
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  size="small"
                  onClick={() => {
                    setAlert(false);
                    setToDelete(null);
                  }}
                  sx={{ marginLeft: 1 }}
                >
                  Não
                </Button>
              </>
            }
            sx={{ mt: 2 }}
          >
            {to_concluir
              ? "Tem certeza que deseja concluir essa linha?"
              : "Tem certeza que deseja deletar essa linha?"}
          </Alert>
        </Collapse>
        {!supress_add
          ? access.cadastrar && (
              <Box>
                <Link
                  to={`/${entity_name}/cadastrar`}
                  style={{ textDecoration: "none" }}
                >
                  <Button
                    sx={{
                      backgroundColor: colors.white[100],
                      color: colors.grey[700],
                      fontSize: "14px",
                      fontWeight: "bold",
                      padding: "10px 20px",
                      "&:hover": {
                        backgroundColor: colors.black[600],
                        color: colors.grey[200],
                      },
                    }}
                  >
                    <AddIcon
                      sx={{
                        color: colors.white[800],
                        fontSize: "26px",
                        mr: "10px",
                      }}
                    />
                    {`Adicionar ${title}`}
                  </Button>
                </Link>
              </Box>
            )
          : null}
      </Box>
      <Box
        m="10px 0 0 0"
        height="75vh"
        maxWidth={collapsed_prop ? "auto" : `${windowSize.width - 290}px`}
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
            fontSize: "14px",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[400],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.indigo[900],
          },
          "& .MuiDataGrid-virtualScroller": {},
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: colors.indigo[900],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.primary[100]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
            fontSize: "14px",
          },
          "& .MuiTablePagination-selectLabel": {
            fontSize: "14px",
          },
          "& .MuiTablePagination-displayedRows": {
            fontSize: "14px",
          },
          "& .MuiInputBase-root": {
            fontSize: "14px",
          },
          "& .colum--header": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          // checkboxSelection -- Para utilizar no futuro
          rows={entity}
          columns={column}
          localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
          slots={{ toolbar: CustomToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Index;
