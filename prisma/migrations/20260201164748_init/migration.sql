-- CreateTable
CREATE TABLE `system_operators` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `is_active` BOOLEAN NOT NULL,
    `role` VARCHAR(191) NOT NULL,
    `created_at` BIGINT NOT NULL,
    `updated_at` BIGINT NULL,

    UNIQUE INDEX `system_operators_id_key`(`id`),
    UNIQUE INDEX `system_operators_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
