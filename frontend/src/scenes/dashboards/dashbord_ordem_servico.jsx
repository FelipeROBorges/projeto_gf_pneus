import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { memo, useEffect, useState } from "react";
import Header from "../../components/Header";
import axios from "axios";

const Dashboard = () => {
  const [dashbord_data, setDashBordData] = useState([]);

  useEffect(() => {
    loadDashBordData();
  }, []);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const loadDashBordData = async () => {
    const result = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/dashbord_ordem_servico`
    );

    setDashBordData(result.data);
  };

  useEffect(() => {
    loadDashBordData();

    const interval = setInterval(() => {
      loadDashBordData();
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const primera_fila_servico = dashbord_data[0]
    ? dashbord_data[0].primeira_fila_servico
    : [];

  const segunda_fila_servico = dashbord_data[0]
    ? dashbord_data[0].segunda_fila_servico
    : [];

  const total = dashbord_data[0] && dashbord_data[0].total;

  console.log(dashbord_data);
  console.log(dashbord_data[0] && dashbord_data[0].total);

  const validarSequencia = (data) => {
    if (data.toString().length == 1) {
      data = "0" + data;
    }
    return data;
  };

  const dateFormatter = (data) => {
    let nova_data = new Date(data);
    let dia = nova_data.getDate();
    dia = validarSequencia(dia);
    let mes = nova_data.getMonth() + 1;
    mes = validarSequencia(mes);
    let ano = nova_data.getFullYear();

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

  return (
    <Box m="12px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="DASHBOARD ORDENS DE SERVIÇO"
          subtitle="Serviços GF Pneus"
        />
      </Box>

      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="130px"
        gap="20px"
      >
        <Box
          borderRadius="15px"
          boxShadow="0px 7px 23px rgba(0, 0, 0, 0.05)"
          gridColumn="span 6"
          gridRow="span 6"
          backgroundColor={colors.black[600]}
          overflow="auto"
          sx={{
            "&::-webkit-scrollbar": {
              width: "5px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: colors.grey[600],
              borderRadius: "2px",
              height: "68px",
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: colors.black[600],
            },
          }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            sx={{
              backgroundColor: colors.grey[800],
              boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.5)",
            }}
            p="15px"
          >
            <Typography color={colors.grey[200]} variant="h5" fontWeight="800">
              {"Fila de Serviços"}
            </Typography>
            <Typography color={colors.grey[200]} variant="h5" fontWeight="800">
              {"Total: " + total}
            </Typography>
          </Box>

          {primera_fila_servico.map((transaction) => (
            <Box
              key={`${transaction.id}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`2px solid ${colors.grey[800]} !important`}
              p="10px"
              width="100%"
            >
              <Box width="200px">
                <Typography variant="h4" fontWeight="600" textAlign="left">
                  {transaction.servico.nome}
                </Typography>
              </Box>
              <Box width="300px">
                <Typography variant="h4" fontWeight="600" textAlign="left">
                  {transaction.placa + " - " + transaction.modelo}
                </Typography>
              </Box>
              <Box
                width="200px"
                variant="h4"
                fontSize="16px"
                fontWeight="800"
                textAlign="left"
              >
                {dateFormatter(transaction.created_at)}
              </Box>
            </Box>
          ))}
        </Box>
        <Box
          borderRadius="15px"
          boxShadow="0px 7px 23px rgba(0, 0, 0, 0.05)"
          gridColumn="span 6"
          gridRow="span 6"
          backgroundColor={colors.black[600]}
          overflow="auto"
          sx={{
            "&::-webkit-scrollbar": {
              width: "5px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: colors.grey[600],
              borderRadius: "2px",
              height: "68px",
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: colors.black[600],
            },
          }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            // borderBottom={`2px solid ${colors.black[400]}`}

            sx={{
              backgroundColor: colors.grey[800],
              boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.5)",
            }}
            p="15px"
          >
            <Typography color={colors.grey[200]} variant="h5" fontWeight="800">
              {"Fila de Serviços"}
            </Typography>
          </Box>
          {segunda_fila_servico.map((transaction) => (
            <Box
              key={`${transaction.id}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`2px solid ${colors.grey[800]} !important`}
              p="10px"
              width="100%"
            >
              <Box width="200px">
                <Typography variant="h4" fontWeight="600" textAlign="left">
                  {transaction.servico.nome}
                </Typography>
              </Box>
              <Box width="300px">
                <Typography variant="h4" fontWeight="600" textAlign="left">
                  {transaction.placa + " - " + transaction.modelo}
                </Typography>
              </Box>
              <Box
                width="200px"
                variant="h4"
                fontSize="16px"
                fontWeight="800"
                textAlign="left"
              >
                {dateFormatter(transaction.created_at)}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default memo(Dashboard);
