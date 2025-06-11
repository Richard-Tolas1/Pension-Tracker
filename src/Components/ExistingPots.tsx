interface Props {
  existingPots: { id: number; name: string; amount: number }[];
  handleAddPot: () => void;
  handlePotChange: (id: number, field: string, value: string) => void;
  handleRemovePot: (id: number) => void;
}
function ExistingPots({
  existingPots,
  handleAddPot,
  handlePotChange,
  handleRemovePot,
}: Props) {
  return (
    <div className="mb-8 p-4 bg-indigo-50 rounded-lg">
      <h2 className="text-xl font-semibold text-indigo-700 mb-4">
        Existing Pension Pots
      </h2>
      {existingPots.map((pot, index) => (
        <div key={pot.id} className="flex items-center space-x-3 mb-3">
          <input
            type="text"
            value={pot.name}
            onChange={(e) => handlePotChange(pot.id, "name", e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder={`Pension Pot ${index + 1} Name`}
          />
          <input
            type="number"
            value={pot.amount}
            onChange={(e) => handlePotChange(pot.id, "amount", e.target.value)}
            className="w-32 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Amount (£)"
          />
          <button
            onClick={() => handleRemovePot(pot.id)}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-3 rounded-md shadow-sm transition duration-150 ease-in-out transform hover:scale-105">
            Remove
          </button>
        </div>
      ))}
      <button
        onClick={handleAddPot}
        className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md shadow-lg transition duration-150 ease-in-out transform hover:scale-105">
        Add Another Pension Pot
      </button>
    </div>
  );
}

export default ExistingPots;
