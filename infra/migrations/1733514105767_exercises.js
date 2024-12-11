/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
  pgm.createTable("exercises", {
    id: "id",
    name: { type: "varchar(255)", notNull: true },
    createdAt: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
    reps: { type: "text" },
    rest_seconds: { type: "integer" },
    img_url: { type: "text" },
    is_active: {
      type: "boolean",
      default: true,
    },
  });

  pgm.createTable("workouts", {
    id: "id",
    name: { type: "varchar(255)", notNull: true },
    description: { type: "text" },
    createdAt: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
    is_active: {
      type: "boolean",
      default: true,
    },
  });

  pgm.createTable("workouts_exercises", {
    workout_id: {
      type: "integer",
      references: "workouts",
      onDelete: "CASCADE",
      notNull: true,
    },
    exercise_id: {
      type: "integer",
      references: "exercises",
      onDelete: "CASCADE",
      notNull: true,
    },
    createdAt: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {};
