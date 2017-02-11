# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Cloack.Repo.insert!(%Cloack.SomeModel{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.
alias Cloack.Repo
alias Cloack.User

User.changeset(%User{}, %{email: "foo@bar.com", password: "123456"})
|> Repo.insert!
