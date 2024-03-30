const View = () => {
  return (
    <div className='px-10 pt-3 bg-lightTheme-secondary text-lightTheme-text dark:bg-darkTheme-secondary dark:text-darkTheme-text'>
      <section>

      </section>
      <section className="pt-2 grid md:grid-cols-2 gap-2">
        {Array.from({ length: 10 }, (_, i) => (
          <article
            key={i}
            className='grid md:grid-cols-2 border-2 p-2'

          >
            <div className="md:order-2 ">
              <div className="flex justify-end items-top relative top-[-10px] right-[-10px] z-10 ">
                <p className="m-0 p-1 bg-blue-500 rounded-bl-xl shadow font-medium hover:scale-105 transition-transform cursor-pointer">Electronics</p>
              </div>
              <img className="relative top-[-40px] right-[-8px]" src="/images/workshop.jpg" alt="..." />
            </div>
            <div className="md:order-1">
              <div className="card-body">
                <h5 className="card-title fs-4">Tech Seminar on High Reliability PV Backsheet</h5>
                <p className="card-text">
                  {`Join us for an enlightening tech seminar presented by Jollywood on the subject of "High Reliability PV Backsheet." In this engaging session, we will delve into the intricacies of photovoltaic backsheet materials, exploring their crucial role in ensuring the durability and longevity of solar panels. Jollywood, a renowned authority in the field, will share invaluable insights, cutting-edge advancements, and best practices for selecting and maintaining high-reliability backsheets. Whether you are an industry professional, researcher, or simply curious about solar technology, this seminar promises to expand your knowledge and enhance your understanding of the critical components that power our sustainable future. Don't miss out!`}
                </p>
                <p className="card-text"><small>Mechanical</small></p>
                <p className="card-text"><small>17-09-2019</small></p>
                <p className="card-text"><small>{22} Views</small></p>
                <a className="card-text text-decoration-none" href='https://wikipedia.com' target='_blank' rel="noreferrer">
                  <small>Visit <i className="fa-solid fa-xs fa-arrow-up-right-from-square"></i></small>
                </a>
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>

  )
}

export default View