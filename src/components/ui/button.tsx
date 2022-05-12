import { FC, DetailedHTMLProps, ButtonHTMLAttributes } from 'react';

interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  size?: 'default' | 'large';
}

export const Button: FC<ButtonProps> = ({
  size,
  className,
  children,
  ...rest
}) => {
  return (
    <button
      className={`group h-[3.45vh] block${
        size === 'default'
          ? ' aspect-[150/46] '
          : size === 'large'
          ? ' aspect-[210/46] '
          : ''
      }border-solid border-[0.1vh] border-black border-t-white border-l-white focus:border-black active:border-black outline-none${
        className ? ` ${className}` : ''
      }`}
      {...rest}
    >
      <div
        className="h-full border-solid border-[0.1vh]
            border-[#808080] border-t-[#DFDFDF] border-l-[#DFDFDF]
            group-focus:border-black group-focus:border-t-white group-focus:border-l-white
            group-active:border-[#808080]
        }"
      >
        <div
          className="flex justify-center items-center h-full bg-[#C0C0C0] border-solid 
              border-[0.1vh] border-[#C0C0C0] group-focus:border-[#808080] group-focus:border-t-[#DFDFDF]
             group-focus:border-l-[#DFDFDF] group-active:border-[#C0C0C0]"
        >
          <div className="w-full mx-[0.5997vh] group-active:pt-[0.15vh] group-active:pl-[0.15vh] text-[1.75vh] whitespace-nowrap overflow-hidden overflow-ellipsis">
            {children}
          </div>
        </div>
      </div>
    </button>
  );
};

Button.defaultProps = {
  size: 'default',
};
