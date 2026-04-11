-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         8.4.3 - MySQL Community Server - GPL
-- SO del servidor:              Win64
-- HeidiSQL Versión:             12.8.0.6908
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para fleteandote
CREATE DATABASE IF NOT EXISTS `fleteandote` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `fleteandote`;

-- Volcando estructura para tabla fleteandote.billetera
DROP TABLE IF EXISTS `billetera`;
CREATE TABLE IF NOT EXISTS `billetera` (
  `billetera_id` int NOT NULL AUTO_INCREMENT,
  `empresa_id` int NOT NULL,
  `saldo_disponible` decimal(10,2) DEFAULT '0.00',
  `saldo_semana_pasada` decimal(10,2) DEFAULT '0.00',
  `actualizado_en` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`billetera_id`),
  KEY `fk_empresa_billetera` (`empresa_id`),
  CONSTRAINT `fk_empresa_billetera` FOREIGN KEY (`empresa_id`) REFERENCES `empresa` (`empresa_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla fleteandote.billetera: ~0 rows (aproximadamente)

-- Volcando estructura para tabla fleteandote.cargamento


-- Volcando datos para la tabla fleteandote.cargamento: ~0 rows (aproximadamente)

-- Volcando estructura para tabla fleteandote.empresa
DROP TABLE IF EXISTS `empresa`;
CREATE TABLE IF NOT EXISTS `empresa` (
  `empresa_id` int NOT NULL AUTO_INCREMENT,
  `nombre_empresa` varchar(255) NOT NULL,
  `email_empresarial` varchar(255) NOT NULL,
  `contrasena_hash` varchar(255) NOT NULL,
  `creado_en` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `actualizado_en` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`empresa_id`),
  UNIQUE KEY `email_empresarial` (`email_empresarial`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla fleteandote.empresa: ~0 rows (aproximadamente)

-- Volcando estructura para tabla fleteandote.envio
DROP TABLE IF EXISTS `envio`;
CREATE TABLE IF NOT EXISTS `envio` (
  `envio_id` int NOT NULL AUTO_INCREMENT,
  `solicitud_id` int NOT NULL,
  `nombre_lugar` varchar(255) DEFAULT NULL,
  `comprador_nombre` varchar(255) DEFAULT NULL,
  `metodo_pago` varchar(100) DEFAULT NULL,
  `hora_inicio` timestamp NULL DEFAULT NULL,
  `hora_fin` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`envio_id`),
  KEY `fk_solicitud_envio` (`solicitud_id`),
  CONSTRAINT `fk_solicitud_envio` FOREIGN KEY (`solicitud_id`) REFERENCES `solicitud` (`solicitud_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla fleteandote.envio: ~0 rows (aproximadamente)

-- Volcando estructura para tabla fleteandote.notificacion
DROP TABLE IF EXISTS `notificacion`;
CREATE TABLE IF NOT EXISTS `notificacion` (
  `notificacion_id` int NOT NULL AUTO_INCREMENT,
  `usuario_id` int DEFAULT NULL,
  `empresa_id` int DEFAULT NULL,
  `titulo` varchar(255) NOT NULL,
  `mensaje` text NOT NULL,
  `leida` tinyint(1) DEFAULT '0',
  `creado_en` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`notificacion_id`),
  KEY `fk_usuario_notif` (`usuario_id`),
  KEY `fk_empresa_notif` (`empresa_id`),
  CONSTRAINT `fk_empresa_notif` FOREIGN KEY (`empresa_id`) REFERENCES `empresa` (`empresa_id`),
  CONSTRAINT `fk_usuario_notif` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`usuario_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla fleteandote.notificacion: ~0 rows (aproximadamente)

-- Volcando estructura para tabla fleteandote.pago
DROP TABLE IF EXISTS `pago`;
CREATE TABLE IF NOT EXISTS `pago` (
  `pago_id` int NOT NULL AUTO_INCREMENT,
  `solicitud_id` int NOT NULL,
  `billetera_id` int NOT NULL,
  `monto` decimal(10,2) NOT NULL,
  `estado` varchar(50) DEFAULT NULL,
  `realizado_en` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`pago_id`),
  KEY `fk_solicitud_pago` (`solicitud_id`),
  KEY `fk_billetera_pago` (`billetera_id`),
  CONSTRAINT `fk_billetera_pago` FOREIGN KEY (`billetera_id`) REFERENCES `billetera` (`billetera_id`),
  CONSTRAINT `fk_solicitud_pago` FOREIGN KEY (`solicitud_id`) REFERENCES `solicitud` (`solicitud_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla fleteandote.pago: ~0 rows (aproximadamente)

-- Volcando estructura para tabla fleteandote.punto_ruta
DROP TABLE IF EXISTS `punto_ruta`;
CREATE TABLE IF NOT EXISTS `punto_ruta` (
  `punto_ruta_id` int NOT NULL AUTO_INCREMENT,
  `solicitud_id` int NOT NULL,
  `tipo` varchar(50) DEFAULT NULL,
  `latitud` float NOT NULL,
  `longitud` float NOT NULL,
  `descripcion` text,
  PRIMARY KEY (`punto_ruta_id`),
  KEY `fk_solicitud_ruta` (`solicitud_id`),
  CONSTRAINT `fk_solicitud_ruta` FOREIGN KEY (`solicitud_id`) REFERENCES `solicitud` (`solicitud_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla fleteandote.punto_ruta: ~0 rows (aproximadamente)

-- Volcando estructura para tabla fleteandote.solicitud
DROP TABLE IF EXISTS `solicitud`;
CREATE TABLE IF NOT EXISTS `solicitud` (
  `solicitud_id` int NOT NULL AUTO_INCREMENT,
  `usuario_id` int NOT NULL,
  `empresa_id` int NOT NULL,
  `precio_ofrecido` decimal(10,2) NOT NULL,
  `distancia_km` float NOT NULL,
  `estado` varchar(50) DEFAULT NULL,
  `hora_inicio` timestamp NULL DEFAULT NULL,
  `hora_fin` timestamp NULL DEFAULT NULL,
  `creado_en` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`solicitud_id`),
  KEY `fk_usuario_solicitud` (`usuario_id`),
  KEY `fk_empresa_solicitud` (`empresa_id`),
  CONSTRAINT `fk_empresa_solicitud` FOREIGN KEY (`empresa_id`) REFERENCES `empresa` (`empresa_id`),
  CONSTRAINT `fk_usuario_solicitud` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`usuario_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla fleteandote.solicitud: ~0 rows (aproximadamente)

-- Volcando estructura para tabla fleteandote.usuario
DROP TABLE IF EXISTS `usuario`;
CREATE TABLE IF NOT EXISTS `usuario` (
  `usuario_id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `contrasena_hash` varchar(255) NOT NULL,
  `rol` varchar(50) NOT NULL,
  `foto_url` text,
  `creado_en` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`usuario_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla fleteandote.usuario: ~4 rows (aproximadamente)
INSERT INTO `usuario` (`usuario_id`, `nombre`, `email`, `contrasena_hash`, `rol`, `foto_url`, `creado_en`) VALUES
	(1, 'Prueba App', 'prueba_1775938396@mail.com', '$2a$10$CCvu7C5/6keZGcBObkeAVepu/MQJZRC.ijVRJoYGDK77M1g0OE1ba', 'user', NULL, '2026-04-11 20:13:16'),
	(2, 'Login Prueba', 'loginprueba_1775938614@mail.com', '$2a$10$ErSGjBEMKnFbFFfRxiaR5.DCQTEQKfBVN8zQInL8Xm0ALQjgGG6Q6', 'user', NULL, '2026-04-11 20:16:54'),
	(3, 'oliver', 'olivercambara2@gmail.com', '$2a$10$SlskKSq.AsceIp9WyTw0OedYM08JerlhBOXwt5QM3cvAuBOrcWYh.', 'user', NULL, '2026-04-11 20:45:45'),
	(4, 'fleteandoye', 'olivercambara3@gmail.com', '$2a$10$P3IARjDc21V.XnZgF0Mu4.pCYspm/iXNjbksSERYaxfM3UtHPdCem', 'transportista', NULL, '2026-04-11 20:51:24');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
