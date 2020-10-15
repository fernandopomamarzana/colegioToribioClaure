-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 15-10-2020 a las 15:20:54
-- Versión del servidor: 10.3.16-MariaDB
-- Versión de PHP: 7.3.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `id14863604_toribioclaure`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `curso`
--

CREATE TABLE `curso` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `nombre_acesor` varchar(255) NOT NULL DEFAULT 'Sin asignar'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `curso`
--

INSERT INTO `curso` (`id`, `name`, `nombre_acesor`) VALUES
('dZrugjWAgmadJKCygpNA', '5to Secundaria ', 'Luis Pedro Mamani Huayta'),
('kz32SI50r69GJoqFKJ8Q', '6to Secundaria', 'Juan Vargas Tudela'),
('r7mn2p9Y0uQmCdleSr9W', '7mo Secundaria', 'lucas gutierrez'),
('YeBOLbbOgckgJI1iy671', '8vo Secundaria', 'julia rocha');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `faltas`
--

CREATE TABLE `faltas` (
  `id` int(11) NOT NULL,
  `id_estudiante` varchar(255) NOT NULL,
  `fecha` varchar(255) NOT NULL,
  `gestion` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `faltas`
--

INSERT INTO `faltas` (`id`, `id_estudiante`, `fecha`, `gestion`) VALUES
(2, '1g3m4XoemtQ4TqndBAJR', '15 de Abril, 2020', '2020'),
(3, '1g3m4XoemtQ4TqndBAJR', '16 de Agosto, 2020', '2020'),
(4, '1g3m4XoemtQ4TqndBAJR', '15 de Abril, 2021', '2021'),
(5, '1g3m4XoemtQ4TqndBAJR', '16 de Octubre, 2021', '2021'),
(6, '1g3m4XoemtQ4TqndBAJR', '14 de Abril, 2021', '2021'),
(7, '1g3m4XoemtQ4TqndBAJR', '21 de Marzo, 2021', '2021'),
(8, 'Ah2OQF6r2hMc9eMjdxvz', '15 de Abril, 2020', '2020'),
(9, 'Ah2OQF6r2hMc9eMjdxvz', '23 de Abril, 2020', '2020'),
(10, 'lHpG1GpPceFQADXes8u0', '16 de Mayo, 2020', '2020'),
(11, 'avgcFsry2pw2HVAS5cRY', '16 de Abril, 2020', '2020'),
(12, 'avgcFsry2pw2HVAS5cRY', '18 de Mayo, 2020', '2020'),
(13, 'RnxwQ6tSqOegKLPQUi0u', '15 de Abril, 2020', '2020'),
(14, 'RnxwQ6tSqOegKLPQUi0u', '15 de Mayo, 2020', '2020'),
(15, 'lEVlJXACYLg24kobFTde', '14 de Junio, 2020', '2020'),
(16, 'lEVlJXACYLg24kobFTde', '16 de Agosto, 2020', '2020'),
(17, 'RnxwQ6tSqOegKLPQUi0u', '17 de Octubre, 2020', '2020'),
(18, 'RnxwQ6tSqOegKLPQUi0u', '17 de Octubre, 2020', '2020'),
(19, 'dGUpWB8SeQpHQ6DXk8io', '15 de Abril, 2020', '2020'),
(20, 'Q9ixSr8rGTKbx0UpJ4jj', '15 de Abril, 2020', '2020');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `materias`
--

CREATE TABLE `materias` (
  `id` int(11) NOT NULL,
  `id_curso` varchar(255) NOT NULL,
  `nombre_curso` varchar(255) NOT NULL,
  `nombre_profesor` varchar(255) NOT NULL,
  `nombre_materia` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `materias`
--

INSERT INTO `materias` (`id`, `id_curso`, `nombre_curso`, `nombre_profesor`, `nombre_materia`) VALUES
(6, '2f8Cqch71NIjPPLjhRxT', '7mo Secundaria', 'Sin asignar', 'MATEMATICAS'),
(7, '2f8Cqch71NIjPPLjhRxT', '7mo Secundaria', 'Jose Sespedes mamani', 'FISICA'),
(8, '2f8Cqch71NIjPPLjhRxT', '7mo Secundaria', 'julia rocha', 'Quimica'),
(9, '2f8Cqch71NIjPPLjhRxT', '7mo Secundaria', 'Sin asignar', 'Artes plasticas'),
(25, 'kz32SI50r69GJoqFKJ8Q', '6to Secundaria', 'Juan Vargas Tudela', 'Literatura'),
(26, 'kz32SI50r69GJoqFKJ8Q', '6to Secundaria', 'julia rocha', 'Matematicas'),
(27, 'kz32SI50r69GJoqFKJ8Q', '6to Secundaria', 'Felipe Gonzales Poma', 'Psicologia'),
(28, 'dZrugjWAgmadJKCygpNA', '5to Secundaria ', 'Luis Pedro Mamani Huayta', 'Filosofia'),
(29, 'YeBOLbbOgckgJI1iy671', '8vo Secundaria', 'julia rocha', 'Computacion');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `notas`
--

CREATE TABLE `notas` (
  `id` int(11) NOT NULL,
  `gestion` varchar(255) NOT NULL,
  `trimestre` varchar(255) NOT NULL,
  `id_estudiante` varchar(255) NOT NULL,
  `nombre_curso` varchar(255) NOT NULL,
  `nombre_materia` varchar(255) NOT NULL,
  `nota` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `notas`
--

INSERT INTO `notas` (`id`, `gestion`, `trimestre`, `id_estudiante`, `nombre_curso`, `nombre_materia`, `nota`) VALUES
(2, '2020', '2do Trimestre', '1g3m4XoemtQ4TqndBAJR', '7mo Secundaria', 'MATEMATICAS', 20.5),
(3, '2020', '1er Trimestre', '1g3m4XoemtQ4TqndBAJR', '7mo Secundaria', 'MATEMATICAS', 60),
(4, '2020', '3er Trimestre', '1g3m4XoemtQ4TqndBAJR', '7mo Secundaria', 'MATEMATICAS', 80.5),
(5, '2020', '1er Trimestre', '1g3m4XoemtQ4TqndBAJR', '7mo Secundaria', 'FISICA', 40.5),
(6, '2020', '2do Trimestre', '1g3m4XoemtQ4TqndBAJR', '7mo Secundaria', 'FISICA', 80.5),
(7, '2020', '3er Trimestre', '1g3m4XoemtQ4TqndBAJR', '7mo Secundaria', 'FISICA', 90.5),
(8, '2020', '1er Trimestre', '1g3m4XoemtQ4TqndBAJR', '7mo Secundaria', 'Quimica', 60),
(9, '2020', '2do Trimestre', '1g3m4XoemtQ4TqndBAJR', '7mo Secundaria', 'Quimica', 70),
(10, '2020', '3er Trimestre', '1g3m4XoemtQ4TqndBAJR', '7mo Secundaria', 'Quimica', 40.5),
(11, '2020', '1er Trimestre', '1g3m4XoemtQ4TqndBAJR', '7mo Secundaria', 'Artes plasticas', 80),
(12, '2020', '2do Trimestre', '1g3m4XoemtQ4TqndBAJR', '7mo Secundaria', 'Artes plasticas', 25),
(13, '2020', '3er Trimestre', '1g3m4XoemtQ4TqndBAJR', '7mo Secundaria', 'Artes plasticas', 60.5),
(29, '2020', '1er Trimestre', 'j1mos0QoqmosiMD36FM9', '4to Secundaria', 'Educacion fisica', 50),
(30, '2020', '2do Trimestre', 'j1mos0QoqmosiMD36FM9', '4to Secundaria', 'Educacion fisica', 60),
(31, '2020', '3er Trimestre', 'j1mos0QoqmosiMD36FM9', '4to Secundaria', 'Educacion fisica', 80),
(32, '2020', '1er Trimestre', 'j1mos0QoqmosiMD36FM9', '4to Secundaria', 'Religion', 56),
(33, '2020', '1er Trimestre', 'j1mos0QoqmosiMD36FM9', '4to Secundaria', 'Religion', 56),
(34, '2020', '2do Trimestre', 'j1mos0QoqmosiMD36FM9', '4to Secundaria', 'Religion', 93),
(35, '2020', '3er Trimestre', 'j1mos0QoqmosiMD36FM9', '4to Secundaria', 'Religion', 42),
(36, '2020', '1er Trimestre', 'okTDGPmU3QQ4N8kYWMMu', '4to Secundaria', 'Educacion fisica', 21),
(37, '2020', '2do Trimestre', 'okTDGPmU3QQ4N8kYWMMu', '4to Secundaria', 'Educacion fisica', 56),
(38, '2020', '3er Trimestre', 'okTDGPmU3QQ4N8kYWMMu', '4to Secundaria', 'Educacion fisica', 49),
(39, '2020', '1er Trimestre', 'okTDGPmU3QQ4N8kYWMMu', '4to Secundaria', 'Religion', 40),
(40, '2020', '2do Trimestre', 'okTDGPmU3QQ4N8kYWMMu', '4to Secundaria', 'Religion', 60),
(41, '2020', '3er Trimestre', 'okTDGPmU3QQ4N8kYWMMu', '4to Secundaria', 'Religion', 80),
(42, '2020', '1er Trimestre', 'okTDGPmU3QQ4N8kYWMMu', '4to Secundaria', 'Psicologia', 80),
(43, '2020', '2do Trimestre', 'okTDGPmU3QQ4N8kYWMMu', '4to Secundaria', 'Psicologia', 92),
(44, '2020', '3er Trimestre', 'okTDGPmU3QQ4N8kYWMMu', '4to Secundaria', 'Psicologia', 85),
(45, '2020', '1er Trimestre', 'j1mos0QoqmosiMD36FM9', '4to Secundaria', 'Psicologia', 58),
(46, '2020', '2do Trimestre', 'j1mos0QoqmosiMD36FM9', '4to Secundaria', 'Psicologia', 20),
(47, '2020', '3er Trimestre', 'j1mos0QoqmosiMD36FM9', '4to Secundaria', 'Psicologia', 10),
(48, '2020', '1er Trimestre', 'y8inAXRhz6y0gpjYfX62', '4to Secundaria', 'Educacion fisica', 10),
(49, '2020', '2do Trimestre', 'y8inAXRhz6y0gpjYfX62', '4to Secundaria', 'Educacion fisica', 40),
(50, '2020', '3er Trimestre', 'y8inAXRhz6y0gpjYfX62', '4to Secundaria', 'Educacion fisica', 25),
(51, '2020', '1er Trimestre', 'y8inAXRhz6y0gpjYfX62', '4to Secundaria', 'Religion', 25),
(52, '2020', '2do Trimestre', 'y8inAXRhz6y0gpjYfX62', '4to Secundaria', 'Religion', 40),
(53, '2020', '3er Trimestre', 'y8inAXRhz6y0gpjYfX62', '4to Secundaria', 'Religion', 58),
(54, '2020', '1er Trimestre', 'y8inAXRhz6y0gpjYfX62', '4to Secundaria', 'Psicologia', 20),
(55, '2020', '2do Trimestre', 'y8inAXRhz6y0gpjYfX62', '4to Secundaria', 'Psicologia', 24),
(56, '2020', '3er Trimestre', 'y8inAXRhz6y0gpjYfX62', '4to Secundaria', 'Psicologia', 16),
(57, '2020', '1er Trimestre', 'lHpG1GpPceFQADXes8u0', '3ro Secundaria', 'Psicologia', 45),
(58, '2020', '2do Trimestre', 'lHpG1GpPceFQADXes8u0', '3ro Secundaria', 'Psicologia', 58),
(59, '2020', '3er Trimestre', 'lHpG1GpPceFQADXes8u0', '3ro Secundaria', 'Psicologia', 85),
(60, '2020', '1er Trimestre', 'avgcFsry2pw2HVAS5cRY', '6to Secundaria', 'Literatura', 100),
(61, '2020', '2do Trimestre', 'avgcFsry2pw2HVAS5cRY', '6to Secundaria', 'Literatura', 78),
(62, '2020', '3er Trimestre', 'avgcFsry2pw2HVAS5cRY', '6to Secundaria', 'Literatura', 54),
(63, '2020', '1er Trimestre', 'avgcFsry2pw2HVAS5cRY', '6to Secundaria', 'Matematicas', 56),
(64, '2020', '2do Trimestre', 'avgcFsry2pw2HVAS5cRY', '6to Secundaria', 'Matematicas', 59),
(65, '2020', '3er Trimestre', 'avgcFsry2pw2HVAS5cRY', '6to Secundaria', 'Matematicas', 58),
(66, '2020', '1er Trimestre', 'lEVlJXACYLg24kobFTde', '6to Secundaria', 'Literatura', 59),
(67, '2020', '2do Trimestre', 'lEVlJXACYLg24kobFTde', '6to Secundaria', 'Literatura', 69),
(68, '2020', '3er Trimestre', 'lEVlJXACYLg24kobFTde', '6to Secundaria', 'Literatura', 56),
(69, '2020', '1er Trimestre', 'lEVlJXACYLg24kobFTde', '6to Secundaria', 'Matematicas', 58),
(70, '2020', '2do Trimestre', 'lEVlJXACYLg24kobFTde', '6to Secundaria', 'Matematicas', 100),
(71, '2020', '3er Trimestre', 'lEVlJXACYLg24kobFTde', '6to Secundaria', 'Matematicas', 100),
(72, '2020', '1er Trimestre', 'RnxwQ6tSqOegKLPQUi0u', '6to Secundaria', 'Literatura', 96),
(73, '2020', '2do Trimestre', 'RnxwQ6tSqOegKLPQUi0u', '6to Secundaria', 'Literatura', 100),
(74, '2020', '3er Trimestre', 'RnxwQ6tSqOegKLPQUi0u', '6to Secundaria', 'Literatura', 100),
(75, '2020', '1er Trimestre', 'RnxwQ6tSqOegKLPQUi0u', '6to Secundaria', 'Matematicas', 96),
(76, '2020', '2do Trimestre', 'RnxwQ6tSqOegKLPQUi0u', '6to Secundaria', 'Matematicas', 100),
(77, '2020', '3er Trimestre', 'RnxwQ6tSqOegKLPQUi0u', '6to Secundaria', 'Matematicas', 100),
(78, '2020', '1er Trimestre', 'RnxwQ6tSqOegKLPQUi0u', '6to Secundaria', 'Psicologia', 96),
(79, '2020', '2do Trimestre', 'RnxwQ6tSqOegKLPQUi0u', '6to Secundaria', 'Psicologia', 58),
(80, '2020', '1er Trimestre', 'dGUpWB8SeQpHQ6DXk8io', '5to Secundaria ', 'Filosofia', 100),
(81, '2020', '2do Trimestre', 'dGUpWB8SeQpHQ6DXk8io', '5to Secundaria ', 'Filosofia', 58),
(82, '2020', '3er Trimestre', 'dGUpWB8SeQpHQ6DXk8io', '5to Secundaria ', 'Filosofia', 95),
(83, '2020', '1er Trimestre', 'l7zkl10zvQHwOaruAsCP', '5to Secundaria ', 'Filosofia', 95),
(84, '2020', '2do Trimestre', 'l7zkl10zvQHwOaruAsCP', '5to Secundaria ', 'Filosofia', 40),
(85, '2020', '1er Trimestre', 'Q9ixSr8rGTKbx0UpJ4jj', '5to Secundaria ', 'Filosofia', 100);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `uid` varchar(255) NOT NULL,
  `ci` varchar(255) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `apellido` varchar(255) NOT NULL,
  `edad` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `numero_telefonico` int(11) NOT NULL,
  `tipo_usuario` varchar(255) NOT NULL,
  `domicilio` varchar(255) NOT NULL,
  `nombre_completo_tutor` varchar(255) NOT NULL,
  `curso` varchar(255) NOT NULL,
  `state` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`uid`, `ci`, `nombre`, `apellido`, `edad`, `username`, `password`, `numero_telefonico`, `tipo_usuario`, `domicilio`, `nombre_completo_tutor`, `curso`, `state`) VALUES
('05d0e8FkKh3rq8hyNd8R', '779760', 'Pamela ', 'Gomez Rios', 30, '779760', '$2a$10$ldmE318oTfNa1jpQ10oa2uOpissBimOXTH2wIXB3j3.fzHhoD5m1W', 77985462, 'Tutor', 'Sipe Sipe', '', '', 0),
('0Puxc3j4TmsUSjrTUJBB', '787912', 'Carolina', 'Poma Marzana', 28, '787912', '$2a$10$wRCeiVne9f3k.iG65XckWepU1.uy76Udz0D3Eqx6pxQ7/fFklse02', 44658986, 'Tutor', 'Sipe Sipe', '', '', 0),
('176nGam5NgO3s2ZXC7Dm', '969825', 'Grober', 'Maldonado Condarco', 30, '969825', '$2a$10$UZHbOyC5nFrrNuiJynSLmOBsE5LqqWQ2dNC.K9tnT3Toqyx8eQFPq', 77985462, 'Tutor', 'Sipe Sipe', '', '', 0),
('1g3m4XoemtQ4TqndBAJR', '365874', 'Ester', 'martinez mamani', 0, '365874', '$2a$10$56njwuK/sde/Nqlw8yI6relRXW9ew2ureaV1k7BVqm/MieG3HOSFi', 78787458, 'Estudiante', 'sacabambilla km 6 1/2.', 'Domingo Martinez', '', 0),
('7Aq6kSJ9XwFHMkx0LV8D', '88778455', 'Jose Esteban', 'Mamani Rocabado', 35, '88778455', '$2a$10$Pj9Gp74Gkbzk8Q4zytxTWOTgtyAhsGSrA30nP6wQb0OYy2ZTNrtDm', 60778445, 'Tutor', 'Sacaba', '', '', 0),
('8qcwHmwCE6UHNMusoKo7', '936794', 'Felipe ', 'Calderon Valdez', 45, '936794', '$2a$10$agYp4HWVo5omfP46d2dyKeT6cScyzJzR1SQz31YJidCqoOIx3jnL2', 77898565, 'Tutor', 'Sipe Sipe', '', '', 0),
('9o4BJpb7aH19edglvLYB', '929353', 'Juan', 'Vargas Tudela', 28, '929353', '$2a$10$RCF/Za5rBzx/GjlSAeJS/eYtvBTrgm4y5ccvhG4CNCb41lXEGmjRW', 77879856, 'Profesor', 'Quillacollo', '', '', 0),
('Ah2OQF6r2hMc9eMjdxvz', '4587789', 'Claudia', 'medrano delgadillo', 0, '4587789', '$2a$10$ppeDtqGYfuqTv8kf48sTye1nI0BvD4TXxIIaaPIcFP3QCqa4sOUw.', 7874587, 'Estudiante', 'av. killman km 8. asera este.', 'Pepe Quiroga Delgadillo', '', 0),
('asBroUJLnXRWMP0g2GdO', '78791', 'Kevin', 'Bozo Marzana', 28, '78791', '$2a$10$txALymE.mHSszTHQVy9p6.HMW9sOwNaNuxjmbo39xBIW0aqhadBHa', 44658985, 'Profesor', 'Quillacollo', '', '', 0),
('avgcFsry2pw2HVAS5cRY', '25458', 'Carla', 'Maldonado Canaviri', 16, '25458', '$2a$10$uRN6jfJMohdmLm2UzRLRdO0h1ALaZSauWGfoIlNfYoskzCbM6AfUG', 44659832, 'Estudiante', 'Sipe Sipe', 'Grober Maldonado Condarco', '6to Secundaria', 0),
('aYhjQ6e6Vnpe8pWB7NS3', '779754', 'Carlos', 'Poma Marzana', 24, '779754', '$2a$10$o.7QOpNCAo0Nj1sO8hBt0uDwEhCHRWBckXem0ZsCKRDyWLdFThy5G', 44358758, 'Tutor', 'Vinto', '', '', 0),
('dGUpWB8SeQpHQ6DXk8io', '922565', 'Clara', 'Nogales Prieto', 12, '922565', '$2a$10$SAuj9LepNphP/7kaMj/7ReddbTr0WSJF0XFwB1ye3A3xNCTy03Ew6', 44585659, 'Estudiante', 'Sipe Sipe', 'Felipe  Calderon Valdez', '5to Secundaria ', 0),
('dsWkDQIykcg8G8osWsOG', '444548', 'Pedro', 'Martinez Poma', 28, '444548', '$2a$10$LjNfDQMzPgVOU4XZmCsbsOTDqSHNIdh5AxadVK/I0BCjZ/Qh2APli', 44659856, 'Profesor', 'Sipe Sipe', '', '', 0),
('eXjJky1wnMaqkkktCMM4', '447879', 'Crisner', 'Velarde Gonzales', 29, '447879', '$2a$10$YUrhHgL4D.gT.RZkSdMUIuRrWU46FEYK4arMqm1DaFDlb9XMZNz12', 44659855, 'Profesor', 'Vinto', '', '', 0),
('fBR6HIswf4b6qlBfYyJz', '771136', 'Carlos ', 'Poma Sainz', 26, '771136', '$2a$10$scQFukpu8axO5x5YUHe9H.DkEJVLru.sA0oGC9hxUut7oGHdY2UZG', 78797568, 'Tutor', 'Vinto', '', '', 0),
('FrLORO5ZuHALvEqF8PGp', '454647', 'Elias', 'Gonzales Marzana', 24, '454647', '$2a$10$jwlsOmc0iK2/8COybnnROe7prMU9rLm0cqg0rVz9sOIpffMyHjCAa', 44356598, 'Tutor', 'Quillacollo', '', '', 0),
('G0sd761MRpXumK5MG0JY', '45548', 'Domingo', 'Martinez', 0, '45548', '$2a$10$gmacgB8KK/Gyl44BvLobYuBMn9j5N4gj1Z5F65JRLnqK/Z1M5/GaC', 2147483647, 'Tutor', 'Quillacollo', '', '', 0),
('gAWuOVO3ePncQ3GCLdFt', '25454512', 'Jose', 'Sespedes mamani', 0, '25454512', '$2a$10$0ibc/pqtnT90bUi8FQQy7OUUZkbPn8ALLyVz95ABHqlsPqIboYFsC', 125478, 'Profesor', 'quillacollo', '', '', 0),
('GqmPWlSJqKd3YAn6dFx9', '93679811', 'Felipe', 'Gonzales Poma', 24, '93679811', '$2a$10$GuHoBNiD9yAIvqIWdhdgbOt9cE.EVc78U7OiorCAutYeINVuccP8i', 77978754, 'Profesor', 'Sipe Sipe', '', '', 0),
('gUScv5Zs1t3RWgh959ka', '747578', 'Pepe', 'Quiroga Delgadillo', 0, '747578', '$2a$10$xCWAyNqtQvuiPCrIn1qvDeSRJ.wJ9JXvhUiZ1n2RoXPBS2eV301V6', 7878548, 'Tutor', 'Plaza Quintanilla km 5 1/2.', '', '', 0),
('GWFEYiU87ufAKgx3PaFS', '458788', 'lucas', 'gutierrez', 0, '458788', '$2a$10$AQeyDIimXgEmFU54oE0d2OzUFuRkT0aHrdS37wOkzFNuUeCfZCKW6', 78758878, 'Profesor', 'Quillacollo km 7 1/2.', '', '', 0),
('HqsSkCsyuVT8QFr1oy83', '878987', 'Ester', 'mujica paredez', 0, '878987', '$2a$10$oiWa.ihZaG3RexcMpi6YDeVaV3Jdr59AM0dYb1wDShtmwElSBtKkm', 45144578, 'Estudiante', 'calle casimiro escudero', 'Pepe Mujica Montesinos', '', 0),
('hs01LsojBNrCHoUPSnda', '8558785', 'Pepe', 'Mujica Montesinos', 0, '8558785', '$2a$10$yro1z5GJg1ZE6kslUVcDGu9C.MVKltBFjTNUF9VebHScOJpF8jmcO', 4554875, 'Tutor', 'Sacaba km 8 1/2. Favelas', '', '', 0),
('HW8OMumliO1nLCoNGGHB', '87892546', 'jose', 'coronado terceros', 0, '87892546', '$2a$10$AQD6ltlnlvyMAXErHDHCUu24QjNSI9LoValQdFpQ/rnTmeETMGkWO', 78745878, 'Estudiante', 'pampa san miguel', 'Agapito Terceros Gutierrez', '', 0),
('iMIxNVLRzh2jDiZhfua7', '454545', 'fernando', 'quiroga mamani', 0, '454545', '$2a$10$FkHVaMvcr1r6HRbbJk0SdeNs/Il0IIx.kyGk7WqX6mZIVUlnQe4.O', 7887845, 'Estudiante', 'lopolok', 'Pepe Quiroga Delgadillo', '', 0),
('IRfLWvXPAt1MAdYcitdu', '779758', 'Pedro', 'Gonzales Hurtado', 25, '779758', '$2a$10$RVnBDLmVHWHSonGyR.1.7u2j0yeP3ebVaxkeS0S.VQESL/8Oiyf36', 77987564, 'Tutor', 'Sipe Sipe', '', '', 0),
('j1mos0QoqmosiMD36FM9', '779761', 'Gorge ', 'Canaviri Gomez', 15, '779761', '$2a$10$m9jRv3PJn6.9Ij.tnQW8GeQTg2l.l3Ia7K/xSsWfCnPdaH0hTXc1O', 44356895, 'Estudiante', 'Sipe Sipe', 'Pamela  Gomez Rios', '', 0),
('J2EmNRmz0IllcwLgmi2L', '4785478', 'juancito ', 'mendez quiroga', 0, '4785478', '$2a$10$gFYrIMraqY47xZO5hvD3sefrMa66cR8O29JwBumdf0ZQOBx4y5uTq', 478547, 'Estudiante', 'av. blanco galindo km 5 1/2.', 'Pepe Quiroga Delgadillo', '', 0),
('j34H9d07YgMplzq6a1A4', '1414145878', 'juan', 'pereira', 0, '1414145878', '$2a$10$W7OzYw7C6da3I87UycXj1OC1xd/rvtPwQTh2.UNlq1Ig.VX1qqf1a', 78458789, 'Director', 'Av. mayorcalisto km 9 1/2.', '', '', 0),
('jZjQg1YTIVxheTNBd2GK', '656869', 'Fernando ', 'Poma Claros', 28, '656869', '$2a$10$vbKwbmqjC8xBln980K3pJ.M5OixH0F/Wym61WFAJR7/EY.8zSeS0a', 44548565, 'Tutor', 'Sipe Sipe', '', '', 0),
('l7zkl10zvQHwOaruAsCP', '55465', 'Leopoldo', 'Fernadez Mancilla', 13, '55465', '$2a$10$B1nFbEZkDNc3/pLX5s6B6eXbC8xmLCAIVJ9cRpVCNVAj0psaaKR9y', 44555665, 'Estudiante', 'Quillacollo', 'Carlo Balderrama mamani', '5to Secundaria ', 0),
('lEVlJXACYLg24kobFTde', '959628', 'Carlos ', 'Campero Medina', 15, '959628', '$2a$10$eyX33xpJ4ov4eyzTeQFZXeTDdjFQQULsWArnLMkyr.YD2CaRHtE5a', 45665555, 'Estudiante', 'Quillacollo', 'Jhannet Medina Aleman', '6to Secundaria', 0),
('lHpG1GpPceFQADXes8u0', '787913', 'Paola', 'Gutierrez Poma', 15, '787913', '$2a$10$j5KWrDGougFURe/9sGyfOuVVV7XqSJUr08fet4LuMf0zswu8d9Gh2', 44658574, 'Estudiante', 'Sipe Sipe', 'Carolina Poma Marzana', '', 0),
('md79ypyz7YFbLj0qCauO', '878542152', 'Maria', 'Terceros zespedes', 0, '878542152', '$2a$10$zk4H6nCq35Wbq8LEbh7QPOepXHGVmGbGbijcVh2n0fpRl6elirO7e', 457887, 'Estudiante', 'porlsoid', 'Agapito Terceros Gutierrez', '', 0),
('nI9TF5koF7NTLjFJxFJG', '959626', 'Jhannet', 'Medina Aleman', 28, '959626', '$2a$10$xC0iHijDy.1ZwqDpWxOz9OzM7LNjZKKGBuhwb8pi1Nbl27l56L4li', 44356898, 'Tutor', 'Quillacollo', '', '', 0),
('okTDGPmU3QQ4N8kYWMMu', '779759', 'Kevin', 'Gonzales Huayta', 13, '779759', '$2a$10$fH.wwjBiJGDQWu0eX0yEvOH2rYiGkdcHfsvdBEDGP.smNDO/0FWOO', 44658965, 'Estudiante', 'Vinto', 'Pedro Gonzales Hurtado', '', 0),
('pDlINV0xOVcfFIgoN7SR', '889911', 'Luis Pedro', 'Mamani Huayta', 45, '889911', '$2a$10$eMS9/BtuhK3QUeRckq.creNOsT8aKB3.1Ixfoo2BORQkslT7kPgi.', 77987895, 'Profesor', 'Sipe Sipe', '', '', 0),
('Q9ixSr8rGTKbx0UpJ4jj', '11455', 'Camila', 'Caballero Ceballos', 12, '11455', '$2a$10$ckaH0GTuW73dTKnDI8Bp7OCqWSx3tIZVC2g30YTo//AUezRUB3hVm', 44658898, 'Estudiante', 'Sipe Sipe', 'Camilo Caballero Mamani', '5to Secundaria ', 0),
('Q9mksCK3s7JzrFv8K1xs', '454878', 'Agapito', 'Terceros Gutierrez', 0, '454878', '$2a$10$1TuUkpsLrcjpM8JFZDxYBewrOsAdLVwaBL2P5rUfeeoi3YdhX7swa', 454547878, 'Tutor', 'Punata', '', '', 0),
('RnxwQ6tSqOegKLPQUi0u', '456898', 'Juan', 'Poma Rodriguez', 16, '456898', '$2a$10$.jWTq9xc.zQPmE924mxVVeoy2ZTFJoMpYmAPPTSio2BYG6qeYoBG2', 44659865, 'Estudiante', 'Sipe Sipe', 'Fernando  Poma Claros', '6to Secundaria', 0),
('RTkUvhCnL0lVmkA0N7Et', '886655', 'Pablo', 'Escobar Mamani', 26, '886655', '$2a$10$94Rxj.aNJAFEDoIQlIGhPu.ZrgmPsO47Y.NarxHbvkNFqY70JFEy.', 77856524, 'Profesor', 'Sipe Sipe', '', '', 0),
('rxK4b5AfS5jnb7HRc2eT', '11234', 'Carlo', 'Balderrama mamani', 14, '11234', '$2a$10$z6gjnJpqBFhaMuTUfubNkex/dpiRZS9tn63mxHgT44zirbYFAa5zS', 77889999, 'Tutor', 'Quillacollo', '', '', 0),
('u05ALQTJgMdjxpPL6dHX', '779754', 'Jhazmin', 'Huarachi Coca', 28, '779754', '$2a$10$ZqZooFcEsP3TmlI844D6GOS/YZZ9vO1MUT3T8IYdpWcP0.MCjNzWC', 77879856, 'Tutor', 'Quillacollo', '', '', 0),
('VA4BzbZmN0aCwghvAq7J', '454623', 'Camilo', 'Caballero Mamani', 25, '454623', '$2a$10$DdcMtgpz7CYt4.aIWJEyF.PgzxQhy2p9r5yMFUnMPftBNWBexV31G', 77856556, 'Tutor', 'Sipe Sipe', '', '', 0),
('VkM0lsoK83p7ALJc32A8', '232321', 'Tomas', 'Mamani Aliendre', 25, '232321', '$2a$10$HGiZzfNtPTk2tX9gz.HbC.pUrJm2amCcbgPDq6aiKOUm.YbUKgOlm', 77898566, 'Tutor', 'Vinto', '', '', 0),
('WaFJdPB8IiobBHYdUqhe', '4745878', 'julia', 'rocha', 25, '4745878', '$2a$10$OjnJreSUaCFlGMpyP1ecXeoqE5UrdRU4GfoagkOT/gATIqxeuGuJu', 78745878, 'Profesora', 'Punata', '', '', 0),
('y8inAXRhz6y0gpjYfX62', '779755', 'Paola', 'Poma Huarachi', 12, '779755', '$2a$10$.2r11nYuhlXkYQ311GUMquNP4f3TadOgNTV6wngfXDLm3n1CYl5B6', 77987856, 'Estudiante', 'Quillacollo', 'Jhazmin Huarachi Coca', '', 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `curso`
--
ALTER TABLE `curso`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `faltas`
--
ALTER TABLE `faltas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `materias`
--
ALTER TABLE `materias`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `notas`
--
ALTER TABLE `notas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`uid`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `faltas`
--
ALTER TABLE `faltas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `materias`
--
ALTER TABLE `materias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT de la tabla `notas`
--
ALTER TABLE `notas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=86;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
