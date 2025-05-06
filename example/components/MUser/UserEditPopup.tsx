import React from 'react';
import { Button, Input } from '@roketid/windmill-react-ui';

const UserEditPopup = ({
  user,
  onClose,
  onSave,
  onChange
}: {
  user: { id: number; username: string; password: string };
  onClose: () => void;
  onSave: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-[500px]">
        <div className="flex justify-between items-center bg-[#2B3674] text-white p-2 rounded-t-lg">
          <h3 className="text-lg font-bold">Edit User</h3>
          <Button
            className="bg-transparent text-white hover:bg-transparent hover:text-white"
            onClick={onClose}
          >
            <span className="text-xl">×</span>
          </Button>
        </div>
        <div className="p-4 space-y-4">
          <div>
            <label className="block font-medium">Username</label>
            <Input name="username" value={user.username} onChange={onChange} />
          </div>
          <div>
            <label className="block font-medium">Password</label>
            <Input name="password" value={user.password} onChange={onChange} />
          </div>
        </div>
        <div className="flex justify-end space-x-2 p-4 border-t">
          <Button className="bg-red-700 text-black hover:bg-[#FF0404]" onClick={onClose}>Batal</Button>
          <Button className="bg-[#2B3674] text-white hover:bg-blue-700" onClick={onSave}>Simpan</Button>
        </div>
      </div>
    </div>
  );
};

export default UserEditPopup;
