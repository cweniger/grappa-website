type Props = {
  active: boolean;
  onClick: () => void;
};
export default function Burger({ active, onClick }: Props) {
  return (
    <div className={"container" + (active ? "active" : "")} onClick={onClick}>
      <div className={"meat meat-1"} />
      <div className={"meat meat-2"} />
      <div className={"meat meat-3"} />
      <style jsx>
        {`
          .container {
            position: fixed;
            width: 38px;
            height: 38px;
            cursor: pointer;
            top: 1.5rem;
            right: 1.25rem;
            z-index: 20;
          }
          .meat {
            position: absolute;
            width: 28px;
            height: 2px;
            background: #000;
            top: calc(50% - 2px / 2);
            left: calc(50% - 28px / 2);
            transition: all 150ms ease-in;
          }
          .meat-1 {
            transform: translateY(-10px);
          }
          .meat-3 {
            transform: translateY(10px);
          }
          .active .meat-1 {
            transform: rotate(45deg);
          }
          .active .meat-2 {
            opacity: 0;
          }
          .active .meat-3 {
            transform: rotate(-45deg);
          }

          @media (min-width: 1240px) {
            .container {
              display: none;
            }
          }
        `}
      </style>
    </div>
  );
}
