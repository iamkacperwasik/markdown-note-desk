type Props = {
  title: string
  views: number
}
export const SimpleInfoPanel = ({title, views}: Props) => (
  <div className="mb-4 flex justify-between gap-8 bg-[#111111f9] p-4">
    <h2 className="font-bold uppercase">{title}</h2>

    <p className="font-semibold">
      Views: <span className="font-bold">{views}</span>
    </p>
  </div>
)
