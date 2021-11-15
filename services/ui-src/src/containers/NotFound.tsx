import "containers/NotFound.scss";

export default function NotFound(): JSX.Element {
  return (
    <div className="NotFound" data-testid="not-found">
      <h3>Sorry, page not found!</h3>
    </div>
  );
}