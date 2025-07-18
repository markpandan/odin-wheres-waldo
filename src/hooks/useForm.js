import { useState } from "react";

const useForm = (fields) => {
  const [inputs, setInputs] = useState({ ...fields });

  const handleChange = (e) => {
    const name = e.target.name;

    let value;
    if (e.target.type == "checkbox") {
      value = e.target.checked;
    } else {
      value = e.target.value;
    }

    setInputs((values) => ({ ...values, [name]: value }));
  };

  return { inputs, setInputs, handleChange };
};

export default useForm;
