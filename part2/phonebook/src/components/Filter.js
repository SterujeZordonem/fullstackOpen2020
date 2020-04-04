import React from 'react'

const Filter = (props) => {
	const {searchFilter, setSearchFilter} = props
	
	const handleFilter = (event) => {
		console.log(event.target.value);
    setSearchFilter(event.target.value);
	}
	
	return (
	<div>
    filter shown with: <input type="text" value={searchFilter} onChange={handleFilter} />
  </div>
	)
}

export default Filter