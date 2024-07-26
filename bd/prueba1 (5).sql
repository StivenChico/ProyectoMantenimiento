  -- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 21-07-2024 a las 18:20:25
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `prueba1`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente`
--

CREATE TABLE `cliente` (
  `id_usuario` int(11) NOT NULL,
  `age` varchar(45) NOT NULL,
  `gender` varchar(45) NOT NULL,
  `height` varchar(45) NOT NULL,
  `weight` varchar(45) NOT NULL,
  `fr_train` varchar(45) NOT NULL,
  `duration_exerss` varchar(45) DEFAULT NULL,
  `goal` varchar(45) NOT NULL,
  `restrictions` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cliente`
--

INSERT INTO `cliente` (`id_usuario`, `age`, `gender`, `height`, `weight`, `fr_train`, `duration_exerss`, `goal`, `restrictions`) VALUES
(2, '18', 'M', '1.75', '70', 'Nunca', '3-4h', 'Ganar musculo', 'ninguna, adicción a la proteína'),
(5, '19', 'M', '1.8', '70', 'ocaional', '1-2h', 'Ganar musculo', 'ninguna'),
(6, '17', 'M', '1.75', '85', 'ocacional', '1-2h', 'bajar de peso', 'ninguna'),
(7, '15', 'F', '1.65', '54', 'ocacional', '1-2h', 'Mantener salud', 'alergica al mani'),
(8, '30', 'M', '1.78', '80', 'Nunca', '0', 'Perder peso', 'diabetes'),
(9, '40', 'F', '1.6', '90', 'Nunca', '0', 'Perder peso', 'diabetes');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `evaluation`
--

CREATE TABLE `evaluation` (
  `id_cliente` int(11) NOT NULL,
  `id_prof` int(11) NOT NULL,
  `fech_evaluation` date NOT NULL,
  `diagnostico` varchar(400) NOT NULL,
  `answer` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `evaluation`
--

INSERT INTO `evaluation` (`id_cliente`, `id_prof`, `fech_evaluation`, `diagnostico`, `answer`) VALUES
(2, 4, '2024-07-20', 'todo bien todo correcto y yo que me alegro', NULL),
(5, 4, '2024-07-20', 'Segun veo tienes poca recurrencia y te recomiento empezar con:\n4 series de 30 flexiones\ndurante una semana para que de a poco ir ganando fuerza', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `profesional`
--

CREATE TABLE `profesional` (
  `id_usuario` int(11) NOT NULL,
  `specialty` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol`
--

CREATE TABLE `rol` (
  `id_rol` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `name_rol` varchar(13) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `rol`
--

INSERT INTO `rol` (`id_rol`, `id_usuario`, `name_rol`) VALUES
(2, 2, 'Usuario'),
(1, 3, 'Administra'),
(3, 4, 'Profesiona'),
(2, 5, 'Usuario'),
(2, 6, 'Usuario'),
(2, 7, 'Usuario'),
(2, 8, 'Usuario'),
(2, 9, 'Usuario');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `routine`
--

CREATE TABLE `routine` (
  `id_prof` int(11) NOT NULL,
  `id_routine` int(11) NOT NULL,
  `goal` varchar(45) NOT NULL,
  `duration` time NOT NULL,
  `break_time` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `username` varchar(45) NOT NULL,
  `name` varchar(45) NOT NULL,
  `surname` varchar(45) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(8) NOT NULL,
  `cell` varchar(10) NOT NULL,
  `rol` int(11) NOT NULL,
  `status` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `username`, `name`, `surname`, `email`, `password`, `cell`, `rol`, `status`) VALUES
(2, 'Carlos2', 'Carlos', 'Carrasquilla', 'carloscas@gmail.com', 'carlosc1', '3213213210', 2, 1),
(3, 'Stiven', 'Stiven', 'Chico', 'stiven@gmail.com', 'con12345', '3013340821', 1, 1),
(4, 'CarlosC', 'Carlos', 'Chomo', 'carlos@gmail.com', 'carlos12', '12312312', 3, 1),
(5, 'Sala', 'Salazar', 'Salalazar', 'sala@gmail.com', 'sala1234', '2342342341', 2, 1),
(6, 'Elim', 'Elim', 'Elim', 'Elim@.', 'elim1234', '1293019231', 2, 0),
(7, 'user3', 'Usuario', 'user', 'user3@gmail.com', 'user3123', '3213212321', 2, 1),
(8, 'Camilo12', 'Camilo', 'David', 'camilodavid@gmail.com', 'camilo12', '3123132131', 2, 1),
(9, 'DaniMan', 'Daniela', 'Manza', 'Daniela@gmail.com', 'dani1234', '3012921029', 2, 1);

--
-- Disparadores `usuarios`
--
DELIMITER $$
CREATE TRIGGER `roles` AFTER INSERT ON `usuarios` FOR EACH ROW IF NEW.rol = 1 THEN
        INSERT INTO rol (id_rol,id_usuario,name_rol)
        VALUES (NEW.rol,NEW.id,"Administrador");
    ELSEIF NEW.rol = 2 THEN
        INSERT INTO rol (id_rol,id_usuario,name_rol)
        VALUES (NEW.rol,NEW.id,"Usuario");
    ELSEIF NEW.rol = 3 THEN
        INSERT INTO rol (id_rol,id_usuario,name_rol)
        VALUES (NEW.rol,NEW.id,"Profesional");
    END IF
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `workout`
--

CREATE TABLE `workout` (
  `id_prof` int(11) NOT NULL,
  `id_routine` int(11) NOT NULL,
  `id_workout` int(11) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `guide` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD PRIMARY KEY (`id_usuario`);

--
-- Indices de la tabla `evaluation`
--
ALTER TABLE `evaluation`
  ADD PRIMARY KEY (`id_cliente`,`id_prof`) USING BTREE;

--
-- Indices de la tabla `profesional`
--
ALTER TABLE `profesional`
  ADD PRIMARY KEY (`id_usuario`);

--
-- Indices de la tabla `rol`
--
ALTER TABLE `rol`
  ADD KEY `rol_ibfk_1` (`id_usuario`);

--
-- Indices de la tabla `routine`
--
ALTER TABLE `routine`
  ADD PRIMARY KEY (`id_prof`,`id_routine`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `workout`
--
ALTER TABLE `workout`
  ADD PRIMARY KEY (`id_prof`,`id_routine`,`id_workout`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD CONSTRAINT `cliente_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`);

--
-- Filtros para la tabla `evaluation`
--
ALTER TABLE `evaluation`
  ADD CONSTRAINT `evaluation_ibfk_1` FOREIGN KEY (`id_cliente`) REFERENCES `cliente` (`id_usuario`),
  ADD CONSTRAINT `evaluation_ibfk_2` FOREIGN KEY (`id_prof`) REFERENCES `profesional` (`id_usuario`),

--
-- Filtros para la tabla `profesional`
--
ALTER TABLE `profesional`
  ADD CONSTRAINT `profesional_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`);

--
-- Filtros para la tabla `rol`
--
ALTER TABLE `rol`
  ADD CONSTRAINT `rol_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`);

--
-- Filtros para la tabla `routine`
--
ALTER TABLE `routine`
  ADD CONSTRAINT `routine_ibfk_1` FOREIGN KEY (`id_prof`) REFERENCES `profesional` (`id_usuario`);

--
-- Filtros para la tabla `workout`
--
ALTER TABLE `workout`
  ADD CONSTRAINT `workout_ibfk_1` FOREIGN KEY (`id_prof`,`id_routine`) REFERENCES `routine` (`id_prof`, `id_routine`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
