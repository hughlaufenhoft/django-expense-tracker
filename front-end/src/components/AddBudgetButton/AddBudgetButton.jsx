import "./styles.css";

import React from "react";
import CustomButton from "../CustomButton/CustomButton";

const AddBudgetButton = () => {
  return (
    <CustomButton
      id='create-budget-btn'
      text='+Add Monthly Budget'
      className='create-budget-btn btn-primary'
      dataTestId='create-budget'
    />
  );
};

export default AddBudgetButton;
