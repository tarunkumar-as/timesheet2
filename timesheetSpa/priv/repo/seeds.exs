# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     TimesheetSpa.Repo.insert!(%TimesheetSpa.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

alias TimesheetSpa.Repo
alias TimesheetSpa.Managers.Manager
alias TimesheetSpa.Workers.Worker
alias TimesheetSpa.Jobs.Job
alias TimesheetSpa.Tasks.Task

pw = Argon2.hash_pwd_salt("test")

Repo.insert!(%Manager{name: "Alice", email: "alice@example.com", password_hash: pw})
Repo.insert!(%Worker{name: "Bob", email: "bob@example.com", password_hash: pw})

Repo.insert!(%Job{job_code: "911", budget_hours: 2, job_name: "Job1", description: "description for job1", manager_id: 1})
Repo.insert!(%Task{hours: 1, note: "note for task1", approval: false, job_code: 1, worker_id: 1})
