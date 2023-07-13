import React from "react";

const Home = () => {
  let total_expense_amount,
    budget,
    current_month_expenses,
    amount_over_budget,
    expenses_vs_budget_percentage_diff,
    green,
    left,
    red,
    right,
    i = null;

  return (
    <>
      <div className='buttons-container'>
        <div className='p-1 text-center'>
          <a
            id='create-expense-btn'
            autoFocus
            className='create-expense-btn btn btn-lg font-weight-bold'
            href="{% url 'expenses:create' %}"
            data-test='create-expense'
          >
            +Add Expense
          </a>
        </div>

        {/* {% if not budget %} */}

        <div className='p-1 text-center'>
          <a
            id='create-budget-btn'
            className='create-budget-btn btn btn-primary btn-lg font-weight-bold'
            href="{% url 'expenses:create_budget' %}"
            data-test='create-budget'
          >
            +Add Monthly Budget
          </a>
        </div>

        {/* {% endif %} */}
      </div>

      {/* {% if not expenses %} */}

      <h5 className='font-weight-bold text-center instruction'>
        No expenses for this user.
      </h5>
      <h5 className='text-center instruction'>
        Add some expenses to display your expense list.
      </h5>

      {/* {% endif %} {% if expenses %} */}

      <div
        id='total-expenses-container'
        className='total-expenses-container m-auto'
      >
        {/* Total expenses: <span>€{{ total_expense_amount }}</span> */}
      </div>

      {/* {% endif %} {% if budget %} */}

      <div className='col-md-9 mx-auto'>
        <div
          id='budget-container'
          className='budget-container font-weight-bold'
          data-test='budget-container'
        >
          <div className='progress'>
            <div
              className='progress-bar {% if current_month_expenses > budget %} bg-danger {% else %} bg-success {% endif %}'
              role='progressbar'
              style={{ width: expenses_vs_budget_percentage_diff }}
              aria-valuenow='50'
              aria-valuemin='0'
              aria-valuemax='100'
              data-test='budget-progress-bar'
            ></div>
          </div>
          <div
            style={{ color: green, float: left, width: "50%" }}
            data-test='monthly-budget'
          >
            Monthly budget:
            <div>
              {/* € {{ budget }} */}
              <a
                href="{% url 'expenses:update_budget' %}"
                className='font-weight-bold'
                data-test='update-budget'
              >
                <span className='badge-pill badge-warning'>✎</span>
              </a>
              <a
                href="{% url 'expenses:delete_budget' %}"
                className='font-weight-bold'
                data-test='delete-budget'
              >
                <span className='badge-pill badge-danger'>X</span>
              </a>
            </div>
          </div>

          <div style={{ color: green }}>
            Current month expenses:
            <div>
              {/* € {{ current_month_expenses }} */}
              {/* {% if current_month_expenses > budget %} */}
              <p style={{ color: red, float: right }}>
                {/* (€ {{ amount_over_budget }} over budget) */}
              </p>
              {/* {% endif %} */}
            </div>
          </div>
        </div>
      </div>

      {/* {% endif %} {% if num_expenses < 2 %} */}

      <h5 className='text-center instruction'>
        When you have 2 or more expenses your line chart will be displayed.
      </h5>

      {/* {% else %} */}

      {/* <!-- Line chart code --> */}
      <div className='canvasContainer col-md-12'>
        <canvas
          id='total-expenses-line-chart'
          className='total-expenses-line-chart'
          data-test='total-expenses-line-chart'
        ></canvas>
      </div>

      <script>
        document.getElementById("create-expense-btn").focus();
        createCharts("homepage");
      </script>

      {/* {% endif %} {% if expenses %} */}

      <div
        id='expense-table'
        className='expense-table'
        data-test='expense-table'
      >
        <table className='table table-striped table-hover table-bg'>
          <thead>
            <tr>
              <th scope='col'>Date</th>
              <th scope='col'>Source</th>
              <th scope='col'>Category</th>
              <th scope='col'>Content</th>
              <th scope='col'>Amount</th>
              <th scope='col'>Update</th>
              <th scope='col'>Delete</th>
            </tr>
          </thead>

          <tbody data-test='expense-table-body'>
            {/* {% for expense in expenses %}
      <tr>
        <td>{{ expense.get_date_without_time }}</td>
        <td>{{ expense.source }}</td>
        <td>{{ expense.category }}</td>
        <td>{{ expense.content }}</td>
        <td>€ {{ expense.amount }}</td>
        <td className="font-weight-bold">
          <a
            href="{% url 'expenses:update' expense.pk %}"
            data-test="update-expense-{{ expense.pk }}"
          >
            <span className="badge-pill badge-warning">✎</span>
          </a>
        </td>
        <td className="font-weight-bold">
          <a
            href="{% url 'expenses:delete' expense.pk %}"
            data-test="delete-expense-{{ expense.pk }}"
          >
            <span className="badge-pill badge-danger">X</span>
          </a>
        </td>
      </tr>
      {% endfor %} */}
          </tbody>
        </table>
      </div>

      {/* {% endif %} {% if expenses.has_other_pages %} */}

      <nav id='pagination-container'>
        <ul className='pagination' data-test='pagination'>
          {/* {% if expenses.has_previous %} */}

          <li className='page-item' data-test='first-button'>
            <a className='page-link' href='?page=1'>
              First
            </a>
          </li>
          <li className='page-item' data-test='previous-button'>
            <a
              className='page-link'
              href='?page={{ expenses.previous_page_number }}'
            >
              Previous
            </a>
          </li>

          {/* {% else %} */}

          <li className='disabled page-item' data-test='first-button'>
            <a className='page-link' href=''>
              First
            </a>
          </li>
          <li className='disabled page-item' data-test='previous-button'>
            <a className='page-link' href=''>
              Previous
            </a>
          </li>

          {/* {% endif %} {% for i in expenses.paginator.page_range %} */}

          {/* <!-- show me pages that are no more than 5 pages below or above the current page. -->
    {% if i > pagination_range_down and i < pagination_range_up %} {% if
    expenses.number == i %} */}

          <li
            className='active page-link page-item'
            data-test='page-link-{{i}}'
          >
            {/* {{ i }} */}
          </li>

          {/* {% else %} */}

          <li className='page-item'>
            <a
              className='page-link'
              data-test='page-link-{{i}}'
              href='?page={{ i }}'
            >
              {/* {{ i }} */}
            </a>
          </li>

          {/* {% endif %} {% endif %} {% endfor %} {% if expenses.has_next %} */}

          <li className='page-item' data-test='next-button'>
            <a
              className='page-link'
              href='?page={{ expenses.next_page_number }}'
            >
              Next
            </a>
          </li>
          <li className='page-item' data-test='last-button'>
            <a className='page-link' href='?page={{ num_pages }}'>
              Last
            </a>
          </li>

          {/* {% else %} */}

          <li className='disabled page-item' data-test='next-button'>
            <a className='page-link' href=''>
              Next
            </a>
          </li>
          <li className='disabled page-item' data-test='last-button'>
            <a className='page-link' href=''>
              Last
            </a>
          </li>

          {/* {% endif %} */}
        </ul>
      </nav>
    </>
  );
};

export default Home;
