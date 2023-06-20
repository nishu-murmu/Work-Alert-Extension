import { ChangeEvent } from 'react'
import { proposalsProps } from '../../../../util/types'
import CustomInput from '../../commonComponent/core/CustomInput'

const CreateProfile: React.FC<{
  setValues: any
  editFlag: any
  clearState: () => void
  values: proposalsProps
  emptyFields: any
  expError: boolean
  submitHandler: (e: ChangeEvent<HTMLButtonElement>) => Promise<void>
}> = ({ setValues, editFlag, clearState, values, emptyFields, submitHandler, expError }) => {
  return (
    <form className="flex flex-col mt-8 items-center">
      <div className="text-2xl font-bold">
        {editFlag.status ? `Edit ${editFlag.name} Profile` : 'Create New Profile'}
      </div>
      <div className="flex gap-x-4 mt-4">
        <CustomInput
          type="text"
          placeholder="Enter Profile"
          name="Enter Profile"
          id="Enter Profile"
          value={values.profile ?? ''}
          className={`bg-transparent border ${
            !emptyFields?.profile ? 'border-white' : 'border-red-600'
          } rounded-md px-3 py-2 text-lg w-[14.5rem]`}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setValues((prev: any) => ({ ...prev, profile: e.target.value }))
          }
          pattern="[a-zA-Z]+"
          onBlur={() => clearState()}
          onClickCapture={() => clearState()}
        />
        <CustomInput
          type="text"
          id="Enter Name"
          name="Enter Name"
          placeholder="Enter Name"
          value={values.name ?? ''}
          onChange={(e) => setValues((prev: any) => ({ ...prev, name: e.target.value }))}
          className={`bg-transparent border ${
            !emptyFields?.name ? 'border-white' : 'border-red-600'
          } rounded-md px-3 py-2 text-lg w-[14.5rem]`}
          pattern="[a-zA-Z]+"
          onBlur={() => clearState()}
          onClickCapture={() => clearState()}
        />
      </div>
      <div className="flex gap-x-4 mt-4">
        <CustomInput
          type="text"
          id="experience-input"
          name="experience-input"
          value={values.experience ?? ''}
          pattern="[0-9]+"
          placeholder="Enter Experience"
          onBlur={() => clearState()}
          onChange={(e) => {
            const input = e.target.value
            const value = parseInt(input)
            if (isNaN(value)) {
              setValues((prev: any) => ({ ...prev, experience: e.target.value }))
            } else {
              setValues((prev: any) => ({ ...prev, experience: value }))
            }
          }}
          className={`bg-transparent border border-white rounded-md px-3 py-2 text-lg w-[30rem]`}
          onClickCapture={() => clearState()}
        />
      </div>
      <textarea
        name="skills"
        id="skills"
        rows={3}
        value={values.skills ?? ''}
        placeholder="Enter Skills"
        onChange={(e) =>
          setValues((prev: any) => ({
            ...prev,
            skills: e.target.value,
          }))
        }
        onClickCapture={() => clearState()}
        onBlur={() => clearState()}
        className={`rounded-md px-4 py-2 border text-lg w-[30rem] bg-transparent mt-4`}
      ></textarea>
      {expError && (
        <div className="flex items-center justify-between w-full rounded-md px-7 text-red-600 py-2 text-md">
          <div> Enter valid experience </div>
          <div></div>
        </div>
      )}
      <textarea
        placeholder="Enter Portfolio"
        value={values.portfolio ?? ''}
        onChange={(e) => setValues((prev: any) => ({ ...prev, portfolio: e.target.value }))}
        className={`flex gap-x-4 mt-4 rounded-md px-4 py-2 border text-lg w-[30rem] bg-transparent`}
        rows={3}
        onBlur={() => clearState()}
        onClickCapture={() => clearState()}
      ></textarea>
      <textarea
        rows={3}
        value={values.proposal ?? ''}
        placeholder="Enter proposal description"
        className={`bg-transparent border mt-4 ${
          !emptyFields?.proposal ? 'border-white' : 'border-red-600'
        } rounded-md px-4 py-2 text-lg w-[30rem]`}
        onBlur={() => clearState()}
        onChange={(e) => {
          setValues((prev: any) => ({ ...prev, proposal: e.target.value }))
        }}
        onClickCapture={() => clearState()}
      />
      <textarea
        rows={3}
        value={values.prebuilt ?? ''}
        placeholder="Enter Prebuilt Proposal"
        className={`bg-transparent border mt-4 ${
          !emptyFields?.proposal ? 'border-white' : 'border-red-600'
        } rounded-md px-4 py-2 text-lg w-[30rem]`}
        onBlur={() => clearState()}
        onChange={(e) => {
          setValues((prev: any) => ({ ...prev, prebuilt: e.target.value }))
        }}
        onClickCapture={() => clearState()}
      />
      {(emptyFields?.profile ||
        emptyFields?.proposal ||
        emptyFields?.name ||
        (emptyFields?.experience && !expError) ||
        emptyFields?.skills) && (
        <div className="text-red-600 text-md mt-3 text-center">Please fill all the fields</div>
      )}
      <button
        type="submit"
        onClick={(e: any) => submitHandler(e)}
        className={`${
          emptyFields?.profile || emptyFields?.proposal || emptyFields?.name ? 'mt-7' : 'mt-9'
        } hover:text-gray-400 border w-2/5 mx-auto bg-transparent place-content-center border-white text-lg px-5 py-2 rounded-md`}
      >
        {editFlag.status ? `Edit Profile` : 'Create Profile'}
      </button>
    </form>
  )
}

export default CreateProfile
