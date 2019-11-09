defmodule TimesheetSpaWeb.PageController do
  use TimesheetSpaWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
