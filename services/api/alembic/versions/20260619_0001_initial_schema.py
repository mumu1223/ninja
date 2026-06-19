"""Initial schema.

Revision ID: 20260619_0001
Revises:
Create Date: 2026-06-19 17:35:00

"""

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql


# revision identifiers, used by Alembic.
revision = "20260619_0001"
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        "roles",
        sa.Column("id", sa.Integer(), primary_key=True, nullable=False),
        sa.Column("name", sa.String(length=64), nullable=False),
        sa.Column("description", sa.String(length=255), nullable=False, server_default=""),
    )
    op.create_index(op.f("ix_roles_id"), "roles", ["id"], unique=False)
    op.create_index("ix_roles_name", "roles", ["name"], unique=True)

    op.create_table(
        "sites",
        sa.Column("id", sa.Integer(), primary_key=True, nullable=False),
        sa.Column("key", sa.String(length=64), nullable=False),
        sa.Column("name", sa.String(length=128), nullable=False),
        sa.Column("is_active", sa.Boolean(), nullable=False, server_default=sa.true()),
    )
    op.create_index(op.f("ix_sites_id"), "sites", ["id"], unique=False)
    op.create_index("ix_sites_key", "sites", ["key"], unique=True)

    op.create_table(
        "system_settings",
        sa.Column("id", sa.Integer(), primary_key=True, nullable=False),
        sa.Column("key", sa.String(length=128), nullable=False),
        sa.Column("value", postgresql.JSONB(astext_type=sa.Text()), nullable=False, server_default="{}"),
    )
    op.create_index(op.f("ix_system_settings_id"), "system_settings", ["id"], unique=False)
    op.create_index("ix_system_settings_key", "system_settings", ["key"], unique=True)

    op.create_table(
        "users",
        sa.Column("id", sa.Integer(), primary_key=True, nullable=False),
        sa.Column("email", sa.String(length=255), nullable=False),
        sa.Column("full_name", sa.String(length=255), nullable=False, server_default=""),
        sa.Column("hashed_password", sa.String(length=255), nullable=False),
        sa.Column("is_active", sa.Boolean(), nullable=False, server_default=sa.true()),
    )
    op.create_index(op.f("ix_users_email"), "users", ["email"], unique=True)
    op.create_index(op.f("ix_users_id"), "users", ["id"], unique=False)

    op.create_table(
        "api_logs",
        sa.Column("id", sa.Integer(), primary_key=True, nullable=False),
        sa.Column("path", sa.String(length=255), nullable=False),
        sa.Column("method", sa.String(length=16), nullable=False),
        sa.Column("status_code", sa.Integer(), nullable=False),
        sa.Column("payload", postgresql.JSONB(astext_type=sa.Text()), nullable=False, server_default="{}"),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.text("now()")),
    )
    op.create_index(op.f("ix_api_logs_id"), "api_logs", ["id"], unique=False)

    op.create_table(
        "dictionary_cache",
        sa.Column("id", sa.Integer(), primary_key=True, nullable=False),
        sa.Column("word", sa.String(length=128), nullable=False),
        sa.Column("provider", sa.String(length=64), nullable=False),
        sa.Column("response", postgresql.JSONB(astext_type=sa.Text()), nullable=False, server_default="{}"),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.text("now()")),
        sa.Column("updated_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.text("now()")),
    )
    op.create_index(op.f("ix_dictionary_cache_id"), "dictionary_cache", ["id"], unique=False)
    op.create_index(op.f("ix_dictionary_cache_word"), "dictionary_cache", ["word"], unique=True)

    op.create_table(
        "dictionary_queries",
        sa.Column("id", sa.Integer(), primary_key=True, nullable=False),
        sa.Column("word", sa.String(length=128), nullable=False),
        sa.Column("normalized_word", sa.String(length=128), nullable=False),
        sa.Column("provider", sa.String(length=64), nullable=False),
        sa.Column("source", sa.String(length=64), nullable=False, server_default="public_api"),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.text("now()")),
    )
    op.create_index(op.f("ix_dictionary_queries_id"), "dictionary_queries", ["id"], unique=False)
    op.create_index(op.f("ix_dictionary_queries_normalized_word"), "dictionary_queries", ["normalized_word"], unique=False)
    op.create_index(op.f("ix_dictionary_queries_word"), "dictionary_queries", ["word"], unique=False)

    op.create_table(
        "user_roles",
        sa.Column("id", sa.Integer(), primary_key=True, nullable=False),
        sa.Column("user_id", sa.Integer(), nullable=False),
        sa.Column("role_id", sa.Integer(), nullable=False),
        sa.ForeignKeyConstraint(["role_id"], ["roles.id"], ondelete="CASCADE"),
        sa.ForeignKeyConstraint(["user_id"], ["users.id"], ondelete="CASCADE"),
        sa.UniqueConstraint("user_id", "role_id", name="uq_user_roles_user_role"),
    )
    op.create_index(op.f("ix_user_roles_id"), "user_roles", ["id"], unique=False)


def downgrade() -> None:
    op.drop_index(op.f("ix_user_roles_id"), table_name="user_roles")
    op.drop_table("user_roles")

    op.drop_index(op.f("ix_dictionary_queries_word"), table_name="dictionary_queries")
    op.drop_index(op.f("ix_dictionary_queries_normalized_word"), table_name="dictionary_queries")
    op.drop_index(op.f("ix_dictionary_queries_id"), table_name="dictionary_queries")
    op.drop_table("dictionary_queries")

    op.drop_index(op.f("ix_dictionary_cache_word"), table_name="dictionary_cache")
    op.drop_index(op.f("ix_dictionary_cache_id"), table_name="dictionary_cache")
    op.drop_table("dictionary_cache")

    op.drop_index(op.f("ix_api_logs_id"), table_name="api_logs")
    op.drop_table("api_logs")

    op.drop_index(op.f("ix_users_id"), table_name="users")
    op.drop_index(op.f("ix_users_email"), table_name="users")
    op.drop_table("users")

    op.drop_index("ix_system_settings_key", table_name="system_settings")
    op.drop_index(op.f("ix_system_settings_id"), table_name="system_settings")
    op.drop_table("system_settings")

    op.drop_index("ix_sites_key", table_name="sites")
    op.drop_index(op.f("ix_sites_id"), table_name="sites")
    op.drop_table("sites")

    op.drop_index("ix_roles_name", table_name="roles")
    op.drop_index(op.f("ix_roles_id"), table_name="roles")
    op.drop_table("roles")
