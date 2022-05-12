import { DetailedHTMLProps, InputHTMLAttributes, forwardRef } from 'react';

interface InputTextProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  containerClassName?: string;
}

export const InputText = forwardRef<HTMLInputElement, InputTextProps>(
  ({ containerClassName, className, children, ...rest }, ref) => {
    return (
      <div
        className={`h-[3.9vh] aspect-[498:52] border-solid border-[0.1vh] border-white border-t-[#808080] border-l-[#808080] ${
          containerClassName ? ` ${containerClassName}` : ''
        }`}
      >
        <div className="h-full w-full border-solid border-[0.1vh] border-[#DFDFDF] border-t-black border-l-black">
          <input
            ref={ref}
            className={`block h-full w-full outline-none text-[1.7vh] ${
              className ? ` ${className}` : ''
            }`}
            type="text"
            {...rest}
          />
        </div>
      </div>
    );
  },
);

InputText.displayName = 'InputText';
