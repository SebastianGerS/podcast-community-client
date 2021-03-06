import React from 'react';

interface Props {
  confirm: (targetUserId: string) => void;
  reject: (targetUserId: string) => void;
  targetUserId: string;
}

function RequestConfirmation({ confirm, reject, targetUserId }: Props): JSX.Element {
  return (
    <div className="request-confirmation">
      <button title="reject" type="button" className="request-reject" onClick={() => reject(targetUserId)} />
      <button title="confirme" type="button" className="request-confirm" onClick={() => confirm(targetUserId)} />
    </div>
  );
}

export default RequestConfirmation;
