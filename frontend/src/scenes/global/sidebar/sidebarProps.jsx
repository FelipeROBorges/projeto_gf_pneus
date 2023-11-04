import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import PersonIcon from "@mui/icons-material/Person";
import HomeIcon from "@mui/icons-material/Home";
import LayersIcon from "@mui/icons-material/Layers";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
import LockPersonIcon from "@mui/icons-material/LockPerson";
import DescriptionIcon from "@mui/icons-material/Description";
import BuildIcon from "@mui/icons-material/Build";
import UnpublishedIcon from "@mui/icons-material/Unpublished";

export const dashbords = [
  {
    path: "/home",
    title: "Principal",
    icon: <HomeIcon />,
  },
];

export const admin = [
  {
    path: "/usuario",
    title: "Usuário",
    icon: <PersonIcon />,
  },
  {
    path: "/perfil",
    title: "Perfil",
    icon: <AdminPanelSettingsIcon />,
  },
  {
    path: "/modulo",
    title: "Modulo",
    icon: <LayersIcon />,
  },
  {
    path: "/acesso",
    title: "Acesso",
    icon: <LockPersonIcon />,
  },
  {
    path: "/operacao",
    title: "Operação",
    icon: <MiscellaneousServicesIcon />,
  },
];

export const gestao_frota = [
  {
    path: "/servico",
    title: "Serviço",
    icon: <BuildIcon />,
  },
  {
    path: "/ordem_servico",
    title: "Ordem de Serviço",
    icon: <DescriptionIcon />,
  },
  {
    path: "/ordem_servico_aconcluir",
    title: "Ordens a Concluir",
    icon: <UnpublishedIcon />,
  },
];

export default {
  dashbords,
  admin,
  gestao_frota,
};
