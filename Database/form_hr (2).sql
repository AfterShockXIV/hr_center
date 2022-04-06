-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 06, 2022 at 03:53 AM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.0.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `form_hr`
--

-- --------------------------------------------------------

--
-- Table structure for table `hr_department`
--

CREATE TABLE `hr_department` (
  `id_department` int(11) NOT NULL,
  `thai_department` text NOT NULL,
  `eng_department` text NOT NULL,
  `name_department` text NOT NULL,
  `id_section` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `hr_department`
--

INSERT INTO `hr_department` (`id_department`, `thai_department`, `eng_department`, `name_department`, `id_section`) VALUES
(4, 'ฝ่ายโครงสร้างระบบดิจิทัล', 'Digital Transformation Department', 'DTM', '7'),
(5, 'ฝ่ายระบบธุรกิจอิเล็กทรอนิกส์', 'E-commerce Business Department', 'ECM', '7'),
(8, 'ฝ่ายวิจัยและพัฒนาผลิตภัณฑ์', 'Research and Development Department', 'RBM', '10'),
(9, 'ฝ่ายห้องปฏิบัติการทดสอบ', 'Laboratory Dapartment', 'LBM', '10'),
(10, 'ฝ่ายคลังสินค้า', 'Warehouse Department ', 'WHM', '10'),
(11, 'ฝ่ายจัดส่ง', 'Logistic Department', 'LGM', '11'),
(12, 'ฝ่ายจัดซื้อและจัดหา', 'Purchasing & Procurement Department ', 'PCM', '11'),
(13, 'ฝ่ายผลิตโรงงาน 1', 'Production Factory 1 Department', 'PDM1', '12'),
(14, 'ฝ่ายผลิตโรงงาน 2', 'Production Factory 2 Department ', 'PDM2', '12'),
(15, 'ฝ่ายผลิตโรงงาน 5 ', 'Prodution Factory 5 Department ', 'PDM5', '12'),
(16, 'ฝ่ายผลิตโรงงาน 7 ', 'Production Factory 7 Department ', 'PDM7', '12'),
(17, 'ฝ่ายวางแผนการผลิต', 'Production Planning Department ', 'PLM', '12'),
(18, 'ฝ่ายวิศวกรรม', 'Engineering Department ', 'ENM', '12'),
(19, 'ฝ่ายประกันคุณภาพและควบคุมคุณภาพ', 'Quality Assurance and Quality Control Department ', 'QAM', '12'),
(20, 'ฝ่ายขาย', 'Sales Department', 'SLM', '13'),
(21, 'ฝ่ายการตลาด', 'Marketing Department', 'MKM', '13'),
(22, 'ฝ่ายการเงิน', 'Financial Department', 'FND', '14'),
(23, 'ฝ่ายบัญชี', 'Accounting Department ', 'ACM', '14'),
(24, 'ฝ่ายทรัพยากรบุคคล', 'Human Resource Department ', 'HRM', '15'),
(25, 'ฝ่ายธุรการ', 'Administrative Department ', 'ADM', '15'),
(26, 'ผู้อำนวยการ', 'Director', 'Dr', '16');

-- --------------------------------------------------------

--
-- Table structure for table `hr_position`
--

CREATE TABLE `hr_position` (
  `id_position` int(11) NOT NULL,
  `thai_position` text NOT NULL,
  `eng_position` text NOT NULL,
  `id_department` int(11) NOT NULL,
  `id_section` int(11) NOT NULL,
  `formLevel` text NOT NULL,
  `toLevel` text NOT NULL,
  `CoutLevel` text NOT NULL,
  `PositionLevel` text NOT NULL,
  `id_supervisor` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `hr_position`
--

INSERT INTO `hr_position` (`id_position`, `thai_position`, `eng_position`, `id_department`, `id_section`, `formLevel`, `toLevel`, `CoutLevel`, `PositionLevel`, `id_supervisor`) VALUES
(66, 'ผู้จัดการระบบธุรกิจอิเล็กทรอนิกส์', 'Manager E-commerce', 5, 7, 'Dr_DED', 'Mg_5_66', '', 'Mg', '0'),
(67, 'ผู้ช่วยผู้จัดการระบบธุรกิจอิเล็กทรอนิกส์', 'Asst.Manager E-Commerce', 5, 7, 'Mg_5_66', 'Ass_5_67', '', 'Ass', '0'),
(68, 'หัวหน้าOnline Platform', 'Supervisor Online Platform', 5, 7, 'Ass_5_67', 'Sup_5_68', '', 'Sup', '0'),
(69, 'Web Application & Programmer', 'Web Application & Programmer', 5, 7, 'Sup_5_68', 'Emp_69', '', 'Emp', '68'),
(70, 'Functional Platform', 'Functional Platform', 5, 7, 'Sup_5_68', 'Emp_70', '', 'Emp', '68'),
(71, 'Marketing Technologist', 'Marketing Technologist', 5, 7, 'Sup_5_68', 'Emp_71', '', 'Emp', '68'),
(72, 'ผู้จัดการโครงสร้างระบบดิจิทัล', 'Manager Digital Transformation', 4, 7, 'Dr_DED', 'Mg_4_72', '', 'Mg', '0'),
(73, 'ผู้ช่วยผู้จัดการโครงสร้างระบบดิจิทัล', 'Asst.Manager Digital Transformation', 4, 7, 'Mg_4_72', 'Ass_4_73', '', 'Ass', '0'),
(74, 'หัวหน้าแผนก Information Technology', 'Supervisor Information Technology', 4, 7, 'Ass_4_73', 'Sup_4_74', '', 'Sup', '0'),
(75, 'หัวหน้าแผนก Software Development', 'Super Software Development', 4, 7, 'Ass_4_73', 'Sup_4_75', '', 'Sup', '0'),
(76, 'Security & Admin System', 'Security & Admin System', 4, 7, 'Sup_4_74', 'Emp_76', '', 'Emp', '74'),
(77, 'IT Technician & Network', 'IT Technician & Network', 4, 7, 'Sup_4_74', 'Emp_77', '', 'Emp', '74'),
(78, 'IT Support', 'IT Support', 4, 7, 'Sup_4_74', 'Emp_78', '', 'Emp', '74'),
(79, 'Electrical Engineer', 'Electrical Engineer', 4, 7, 'Sup_4_74', 'Emp_79', '', 'Emp', '74'),
(80, 'ABAPER SAP', 'ABAPER SAP', 4, 7, 'Sup_4_75', 'Emp_80', '', 'Emp', '75'),
(81, 'SAP Functional', 'SAP Functional', 4, 7, 'Sup_4_75', 'Emp_81', '', 'Emp', '75'),
(82, 'Web  Application & Programmer', 'Web  Application Programmer', 4, 7, 'Sup_4_75', 'Emp_82', '', 'Emp', '75'),
(83, 'ผู้จัดการ', 'Manager', 24, 15, 'Dr_HAD', 'Mg_24_83', '', 'Mg', '0'),
(84, 'ผู้ช่วยผู้จัดการ', 'ผู้ช่วยผู้จัดการ', 24, 15, 'Mg_24_83', 'Ass_24_84', '', 'Ass', '0'),
(85, 'หัวหน้าแผนก (ทั่วไป)', 'Supervisor (general)', 24, 15, 'Ass_24_84', 'Sup_24_85', '', 'Sup', '0'),
(86, 'หัวหน้าแผนก (สรรหาว่าจ้าง)', 'Supervisor (๋Job)', 24, 15, 'Ass_24_84', 'Sup_24_86', '', 'Sup', '0'),
(87, 'สรรหาว่าจ้าง', 'Recruiting', 24, 15, 'Sup_24_85', 'Emp_87', '', 'Emp', '85'),
(88, 'ผู้อำนวยการ DED', 'Drirector (DED)', 26, 7, '-', 'Dr_DED', '', 'Dr', '0'),
(93, 'ผู้อำนวยการ (HAD)', 'Drirector (HAD)', 26, 15, '-', 'Dr_HAD', '', 'Dr', '0'),
(94, 'ผู้อำนวยการ(IAD)', 'Director (IAD)', 26, 9, '-', 'Dr_IAD', '', 'Dr', '0'),
(95, 'ผู้อำนวยการ (RDD)', 'Director (RDD)', 26, 10, '-', 'Dr_IAD', '', 'Dr', '0'),
(96, 'ผู้อำนวยการ(SCD)', 'Director(SCD)', 26, 11, '-', 'Dr_SCD', '', 'Dr', '0'),
(97, 'ผู้อำนวยการ(OPD)', 'Director(OPD)', 26, 12, '-', 'Dr_OPD', '', 'Dr', '0'),
(98, 'ผู้อำนวยการ(SMD)', 'Director(SMD)', 26, 13, '-', 'Dr_SMD', '', 'Dr', '0'),
(99, 'ผู้อำนวยการ(AFD)', 'Director AFD', 26, 14, '-', 'Dr_AFD', '', 'Dr', '0'),
(100, 'สรรหาว่าจ้าง', 'Recruiting', 24, 15, 'Sup_24_86', 'Emp_100', '', 'Emp', '86'),
(101, 'พัฒนาบุคลากร', 'human resource development', 24, 15, 'Sup_24_85', 'Emp_101', '', 'Emp', '85'),
(102, 'บริหารค่าจ้าง', 'payroll', 24, 15, 'Sup_24_85', 'Emp_102', '', 'Emp', '85'),
(103, 'แรงงานสัมพันธ์', 'labor relations', 24, 15, 'Sup_24_85', 'Emp_103', '', 'Emp', '85'),
(112, 'ผู้จัดการฝ่ายจัดส่ง', 'Manager Shipping', 11, 11, 'Dr_SCD', 'Mg_11_112', '', 'Mg', '0'),
(113, 'ผู้ช่วยผู้จัดการฝ่ายจัดส่ง', 'Asst.Manager Shipping', 11, 11, 'Mg_11_112', 'Ass_11_113', '', 'Ass', '0'),
(114, 'หัวหน้าแผนกจัดส่ง', 'Supervisor Shipping', 11, 11, 'Ass_11_113', 'Sup_11_114', '', 'Sup', '0'),
(115, 'จัดส่ง', 'Shipping', 11, 11, 'Sup_11_114', 'Emp_115', '', 'Emp', '114'),
(116, 'ขับรถ 6 ล้อ 10 ล้อ', '-', 11, 11, 'Sup_11_114', 'Emp_116', '', 'Emp', '114'),
(121, 'ผู้จัดการ PDM1', 'Manager PDM1', 13, 12, 'Dr_OPD', 'Mg_13_121', '', 'Mg', '0'),
(122, 'ผู้ช่วยผู้จัดการ PDM1', 'ผู้ช่วยผู้จัดการ PDM1', 13, 12, 'Mg_13_121', 'Ass_13_122', '', 'Ass', '0'),
(123, 'หัวหน้าแผนก PDM1', 'Supervisor PDM1', 13, 12, 'Ass_13_122', 'Sup_13_123', '', 'Sup', '0'),
(124, 'รอแก้ไขตำแหน่ง', 'รอแก้ไขตำแหน่ง', 13, 12, 'Sup_13_123', 'Emp_124', '', 'Emp', '123');

-- --------------------------------------------------------

--
-- Table structure for table `hr_section`
--

CREATE TABLE `hr_section` (
  `id_section` int(11) NOT NULL,
  `thai_section` text NOT NULL,
  `eng_section` text NOT NULL,
  `name_section` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `hr_section`
--

INSERT INTO `hr_section` (`id_section`, `thai_section`, `eng_section`, `name_section`) VALUES
(7, 'สายงานดิจิทัลและระบบธุรกิจอิเล็กทรอนิกส์', 'Digital & E-commerce ', 'DED'),
(9, 'สายงานกิจการระหว่างประเทศ', 'International Corporate Affairs Division ', 'IAD'),
(10, 'สายงานวิจัยและพัฒนาผลิตภัณฑ์', 'Research and Development Division', 'RDD'),
(11, 'สายงานการจัดการห่วงโซ่อุปทาน', 'Supply Chain Management Division', 'SCD'),
(12, 'สายงานปฏิบัติการโรงงาน', 'Operation Division', 'OPD'),
(13, 'สายงานการตลาดและขาย', 'Sales & Marketing Division ', 'SMD'),
(14, 'สายงานบัญชีและการเงิน', 'Accounting & Financial Division', 'AFD'),
(15, 'สายงานทรัพยากรบุคคลและธุรการ', 'Human Resource & Administrative Division ', 'HAD'),
(16, 'ผู้อำนวยการ', 'Director', 'Dr');

-- --------------------------------------------------------

--
-- Table structure for table `main_hr`
--

CREATE TABLE `main_hr` (
  `main_hr_id` int(11) NOT NULL,
  `id_section` int(11) NOT NULL,
  `id_department` int(11) NOT NULL,
  `id_position` int(11) NOT NULL,
  `hr_run_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `project_hr`
--

CREATE TABLE `project_hr` (
  `hr_employeeid` text NOT NULL,
  `hr_employeename` text NOT NULL,
  `hr_surname` text NOT NULL,
  `hr_employee_eng` text NOT NULL,
  `hr_lastname_eng` text NOT NULL,
  `hr_nickname` text NOT NULL,
  `hr_phone` text NOT NULL,
  `id_position` text NOT NULL,
  `id_department` text NOT NULL,
  `hr_job_start` text NOT NULL,
  `hr_email_user` text NOT NULL,
  `hr_password` text NOT NULL,
  `hr_employee_img` text NOT NULL,
  `id_section` text NOT NULL,
  `hr_emp` text NOT NULL,
  `hr_run_id` int(11) NOT NULL,
  `number_emp` text NOT NULL,
  `status_emp` text NOT NULL,
  `job_out` text NOT NULL,
  `birthday_emp` text NOT NULL,
  `status_approve` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `project_hr`
--

INSERT INTO `project_hr` (`hr_employeeid`, `hr_employeename`, `hr_surname`, `hr_employee_eng`, `hr_lastname_eng`, `hr_nickname`, `hr_phone`, `id_position`, `id_department`, `hr_job_start`, `hr_email_user`, `hr_password`, `hr_employee_img`, `id_section`, `hr_emp`, `hr_run_id`, `number_emp`, `status_emp`, `job_out`, `birthday_emp`, `status_approve`) VALUES
('8', 'ตรีเกษม', 'สิงห์โตแก้ว', 'Treekasem', 'Singtokaew', 'อ๊าฟ', '0904298893', '82', '4', '2022-03-30', '', 'admin', 'IMGEMP_8.jpeg', '7', 'รายเดือน', 204, '6480014', 'ทำงานอยู่', '', '1996-03-20', 'approve'),
('admin', 'ADMIN_HR', 'ADMIN_HR', 'ADMIN_HR', 'ADMIN_HR', 'ADMIN_HR', '00', '83', '24', '2022-03-31', 'admin@s', 'admin', '', '15', 'รายเดือน', 205, '12', 'ทำงานอยู่', '', '2022-03-31', 'approve'),
('12345678', 'แสงเดือน', 'เพ็ชรประดิษฐ', 'sang', 'phech', 'แมว', '111', '88', '26', '2022-04-04', '', '123456', 'IMGEMP_207.jpeg', '16', 'รายเดือน', 207, '123', 'ทำงานอยู่', '', '2022-04-04', 'wait'),
('RW570133', 'อาทิตย์', 'ภาพันธ์', '-', '-', 'เอ็ม', '0000000000', '73', '4', '2022-04-05', '', '12345', 'IMGEMP_RW570133.jpeg', '7', 'รายเดือน', 208, '-', 'ทำงานอยู่', '', '2022-04-05', 'wait'),
('VCB62352', 'ธนานันท์', 'รอดเเผ้วพาด', '-', '-', 'หนุ่ม', '00000000', '80', '4', '2022-04-05', '', '12345', 'IMGEMP_209.jpeg', '7', 'รายเดือน', 209, '-', 'ทำงานอยู่', '', '2022-04-05', 'wait'),
('VCB62353', 'อารดา', 'วันทนาสินธุ์', '-', '-', 'นัท', '000000000', '78', '4', '2022-04-05', '', '12345', 'IMGEMP_VCB62353.jpeg', '7', 'รายเดือน', 210, '-', 'ทำงานอยู่', '', '2022-04-05', 'wait'),
('VCB63240', 'โกมล', 'เกษพาณิช', '-', '-', 'ตูน', '000000000', '77', '4', '2022-04-05', '', '12345', 'IMGEMP_VCB63240.jpeg', '7', 'รายเดือน', 211, '-', 'ทำงานอยู่', '', '2022-04-05', 'wait'),
('-', 'วาสนา', 'ภิญโญ', '-', '-', 'โอ', '00000000', '68', '5', '2022-04-05', '', '12345', 'IMGEMP_212.jpeg', '7', 'รายเดือน', 212, '-', 'ทำงานอยู่', '', '2022-04-05', 'wait'),
('-', 'ศิรชา', 'ปัญญาอุด', 'Siracha', 'Panya-ud', 'May', '0918560296', '69', '5', '2022-04-05', 'Siracha_p@veninecable.com', '12345', 'IMGEMP_-.jpeg', '7', 'รายเดือน', 213, '-', 'ทำงานอยู่', '', '2022-04-03', 'wait');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `hr_department`
--
ALTER TABLE `hr_department`
  ADD PRIMARY KEY (`id_department`);

--
-- Indexes for table `hr_position`
--
ALTER TABLE `hr_position`
  ADD PRIMARY KEY (`id_position`);

--
-- Indexes for table `hr_section`
--
ALTER TABLE `hr_section`
  ADD PRIMARY KEY (`id_section`);

--
-- Indexes for table `main_hr`
--
ALTER TABLE `main_hr`
  ADD PRIMARY KEY (`main_hr_id`);

--
-- Indexes for table `project_hr`
--
ALTER TABLE `project_hr`
  ADD PRIMARY KEY (`hr_run_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `hr_department`
--
ALTER TABLE `hr_department`
  MODIFY `id_department` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `hr_position`
--
ALTER TABLE `hr_position`
  MODIFY `id_position` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=125;

--
-- AUTO_INCREMENT for table `hr_section`
--
ALTER TABLE `hr_section`
  MODIFY `id_section` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `main_hr`
--
ALTER TABLE `main_hr`
  MODIFY `main_hr_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `project_hr`
--
ALTER TABLE `project_hr`
  MODIFY `hr_run_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=214;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
