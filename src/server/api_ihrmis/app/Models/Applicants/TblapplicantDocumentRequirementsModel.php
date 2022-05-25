<?php

namespace App\Models\Applicants;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TblapplicantDocumentRequirementsModel extends Model
{
    use HasFactory;

    protected $table = 'tbldocumentary_requirements';
    protected $primaryKey = 'doc_id';
    protected $fillable = [
        'doc_name',
        'doc_group',
    ];
    
    public $timestamps = false;

    public function tbldocumentaryAttachments()
    {
        return $this->belongsToMany(TblapplicantAttachmentsModel::class, 'tbldocumentary_requirements','doc_id','doc_id','','att_app_doc_id');
    }
}