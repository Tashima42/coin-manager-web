import './formGroup.scss'


const FormGroup = (props: any) => {
    const { fieldName, register, errors, placeholder, isRequired, type, min, step, value, readonly } = props
    return (
        <div className={'formGroup'}>
            <div className={'formGroupInfo'}>
                <label htmlFor={fieldName}>{fieldName}</label>
                {errors[fieldName] && <p>{errors[fieldName].message}</p>}
            </div>
            <input 
            className={readonly=== true ? "input-readonly" : null}
              type={type} 
              placeholder={placeholder} 
              min={min} 
              step={step}
              value={value} 
              readOnly={readonly === true ? "readonly" : null} 
              {...register(fieldName, {required: {value: isRequired, message: 'Required field'}})}
            />
        </div>
    );
};
export default FormGroup;
